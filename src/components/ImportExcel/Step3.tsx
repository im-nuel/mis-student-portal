import {
  Box,
  Button,
  Group,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import { ReportCardPreview } from "./ReportCardPreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Step3Props = {
  data: any[];
};

export const Step3: React.FC<Step3Props> = ({ data }) => {
  const [paperSize, setPaperSize] = useState<"A4" | "F4">("A4");
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!printRef.current) return;

    const container = printRef.current;

    const canvases = await Promise.all(
      Array.from(container.children).map((child) =>
        html2canvas(child as HTMLElement, {
          scale: 4,
          useCORS: true,
          backgroundColor: null,
        })
      )
    );

    const width = paperSize === "F4" ? 1248 : 1123;
    const height = 794;

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [width, height],
    });

    canvases.forEach((canvas, index) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      doc.addImage(imgData, "JPEG", 0, 0, width, height);
      if (index < canvases.length - 1) {
        doc.addPage();
      }
    });

    doc.save("ReportCards.pdf");
  };

  return (
    <Stack spacing="lg">
      <Group position="apart">
        <Title order={5}>Step 3 – Preview Report Cards</Title>
        <Group spacing="xs">
          <Select
            size="xs"
            value={paperSize}
            onChange={(val) => setPaperSize(val as "A4" | "F4")}
            data={[
              { label: "A4 (210 × 297 mm)", value: "A4" },
              // { label: "F4 (210 × 330 mm)", value: "F4" },
            ]}
            allowDeselect={false}
            withinPortal={false}
            styles={{ root: { minWidth: 120 } }}
          />
          <Button leftIcon={<IconDownload size={16} />} onClick={handleDownload}>
            Download PDF
          </Button>
        </Group>
      </Group>

      <Box
        ref={printRef}
        style={{
          overflow: "auto",
          maxHeight: "calc(100vh - 160px)",
          padding: 16,
          background: "#f8f9fa",
        }}
      >
        {data.map((student, index) => (
          <ReportCardPreview
            key={index}
            student={student}
            paperSize={paperSize}
          />
        ))}
      </Box>
    </Stack>
  );
};