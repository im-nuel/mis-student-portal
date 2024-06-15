import { Button } from "@mantine/core";
import { IconDownload, IconPrinter } from "@tabler/icons-react";
import React, { useEffect } from "react";
import { StudentSchema } from "../../provider/schema/student.schema";
import { useList } from "@refinedev/core";
import { SiteConfigSchema } from "../../provider/schema/site-config";
import { documentPatch } from "./documentPatch";
import { renderAsync } from "docx-preview";
import { useReactToPrint } from "react-to-print";
import { content } from "html2canvas/dist/types/css/property-descriptors/content";
import { saveAs } from "file-saver";

export const DocumentPrint: React.FC<{ record: StudentSchema }> = ({
  record,
}) => {
  const preview = React.useRef<HTMLDivElement | null>(null);
  const [fileTemplate, setFileTemplate] = React.useState<Uint8Array | null>(
    null
  );

  const handlePrint = useReactToPrint({
    // copyStyles: false,
    pageStyle: `
      @page {
        /* Remove browser default header (title) and footer (url) */
        margin: 0;
      }
      @media print {
          body {
              /* Tell browsers to print background colors */
              -webkit-print-color-adjust: exact; /* Chrome/Safari/Edge/Opera */
              color-adjust: exact; /* Firefox */
          }
      }
    `,
    srcdoc: " ",
  });

  const siteConfigRes = useList<SiteConfigSchema>({
    resource: "site-config",
    filters: [
      {
        field: "name",
        operator: "eq",
        value: "student-document-template",
      },
    ],
  });

  const documentTemplate = siteConfigRes.data?.data[0];

  React.useEffect(() => {
    const run = async () => {
      if (!documentTemplate?.value) return;
      preview.current = null;
      try {
        const docs = await documentPatch(documentTemplate?.value, record);
        setFileTemplate(docs);
      } catch (err) {
        console.error(err);
      }
    };
    run();
  }, [record, documentTemplate?.value]);

  React.useEffect(() => {
    const run = async () => {
      if (!fileTemplate) return;
      const docsAsElement = document.createElement("div");
      await renderAsync(fileTemplate, docsAsElement, undefined, {
        experimental: true,
        inWrapper: false,
        renderChanges: true,
        debug: true,
      });
      preview.current = docsAsElement;
    };
    run();
  }, [fileTemplate]);

  return (
    <>
      <Button
        loading={!preview || !fileTemplate}
        leftIcon={<IconPrinter />}
        variant="default"
        onClick={() => {
          if (!preview) return;
          handlePrint(null, () => preview.current);
        }}
      >
        Print
      </Button>

      <Button
        loading={!fileTemplate}
        variant="default"
        leftIcon={<IconDownload />}
        onClick={() => {
          if (fileTemplate)
            saveAs(new Blob([fileTemplate]), `Document_${record.id}.docx`);
        }}
      >
        Download
      </Button>
    </>
  );
};
