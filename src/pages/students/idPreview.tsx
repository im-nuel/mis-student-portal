import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IDCardPreview } from "../../components/id_card_preview";
import React from "react";
import _isEmpty from "lodash/isEmpty";
import { StudentSchema } from "../../provider/schema/student.schema";
import { toJpeg } from "html-to-image";
import { capitalizeString } from "../../components/utils/capitalized";
import IDTemplateECPImage from "./IDTemplate-ECP.jpg";
import IDTemplateESImage from "./IDTemplate-ES.jpg";
import IDTemplateMSImage from "./IDTemplate-MS.jpg";
import IDTemplateHSImage from "./IDTemplate-HS.jpg";
import { useReactToPrint } from "react-to-print";

const TEMPLATE_SOURCE = {
  ECP: IDTemplateECPImage,
  ES: IDTemplateESImage,
  MS: IDTemplateMSImage,
  HS: IDTemplateHSImage,
};

export const IDPreview: React.FC<{ record: StudentSchema }> = ({ record }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const refCanvas = React.useRef(null);

  const handlePrint = useReactToPrint({
    content: () => refCanvas.current,
  });

  const handleDownload = () => {
    if (!refCanvas.current) return;
    toJpeg(refCanvas.current, { cacheBust: true }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${capitalizeString(
        `${!!record.last_name ? record.last_name + ", " : ""}${
          record.first_name
        }${record.middle_name ? ` ${record.middle_name}` : ""}`
      )}.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <>
      <Button loading={!record} onClick={toggle}>
        ID Card
      </Button>
      <Modal
        title="ID Card Preview"
        opened={opened}
        onClose={function () {
          toggle();
        }}
      >
        {!_isEmpty(record) && (
          <IDCardPreview
            ref={(ref) => (refCanvas.current = ref as any)}
            record={record}
            src={TEMPLATE_SOURCE[record.section]}
          />
        )}
        <Group mt="lg" position="center">
          <Button onClick={handleDownload}>Download</Button>
          <Button onClick={handlePrint}>Print</Button>
        </Group>
      </Modal>
    </>
  );
};
