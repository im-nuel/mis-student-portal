import {
  Box,
  Button,
  Group,
  Select,
  Stack,
  Text,
  Title,
  Slider, 
  NumberInput,
  TextInput,
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
  const [fontSize, setFontSize] = useState(11);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [date, setDate] = useState("");
  const [homeroom, setHomeroom] = useState("");
  const [principal, setPrincipal] = useState("");
  const [homeroomSignature, setHomeroomSignature] = useState("");
  const [principalSignature, setPrincipalSignature] = useState("");

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
            fontSize={fontSize}
            lineHeight={lineHeight}
            date={date}
            homeroom={homeroom}
            principal={principal}
            homeroomSignature= {homeroomSignature}
            principalSignature= {principalSignature}
          />
        ))}
      </Box>

      <Box
        style={{
          padding: 16,
          border: "1px solid #dee2e6",
          borderRadius: 8,
          background: "#fff",
          boxShadow: "0 0 6px rgba(0,0,0,0.05)",
        }}
      >
        <Stack spacing="md">
          <Title order={5}>Adjustments</Title>

          <Group align="flex-start" grow noWrap>
            {/* Font Size + Line Height */}
            <Stack style={{ flex: 1 }} spacing="md">
              {/* Font Size */}
              <Box>
                <Text size="sm" fw={500} mb={4}>
                  Notes Font Size ({fontSize}px)
                </Text>
                <Group spacing="xs" align="center" grow>
                  <Slider
                    min={5}
                    max={20}
                    step={1}
                    value={fontSize}
                    onChange={setFontSize}
                  />
                  <NumberInput
                    min={5}
                    max={20}
                    step={1}
                    value={fontSize}
                    onChange={(val) => setFontSize(Number(val))}
                    w={70}
                    size="xs"
                  />
                </Group>
              </Box>

              {/* Line Height */}
              <Box>
                <Text size="sm" fw={500} mb={4}>
                  Notes Line Height ({lineHeight})
                </Text>
                <Group spacing="xs" align="center" grow>
                  <Slider
                    min={0.5}
                    max={3}
                    step={0.1}
                    precision={1}
                    value={lineHeight}
                    onChange={setLineHeight}
                  />
                  <NumberInput
                    min={0.5}
                    max={3}
                    step={0.1}
                    precision={1}
                    value={lineHeight}
                    onChange={(val) => setLineHeight(Number(val))}
                    w={70}
                    size="xs"
                  />
                </Group>
              </Box>
            </Stack>

            {/* Signature Date Input */}
            <Box style={{ width: 220 }}>
              <Text size="sm" fw={500} mb={4}>
                Signature Date
              </Text>
              <TextInput
                placeholder="e.g. July 10, 2025"
                size="sm"
                value={date}
                onChange={(e) => setDate(e.currentTarget.value)}
              />
              
              <Text size="sm" pt="xs" fw={500} mb={4}>
                Homeroom Advisor
              </Text>
              <TextInput
                placeholder="e.g. Ms. Gadis Kloah"
                size="sm"
                value={homeroom}
                onChange={(e) => setHomeroom(e.currentTarget.value)}
              />
              
              <Text size="sm" pt="xs" fw={500} mb={4}>
                Principal
              </Text>
              <TextInput
                placeholder="e.g. Ms. Gadis Kloah 2"
                size="sm"
                value={principal}
                onChange={(e) => setPrincipal(e.currentTarget.value)}
              />
            </Box>

            <Box style={{ width: 220 }}>
              <Text size="sm" fw={500} mb={4}>
                Homeroom Signature
              </Text>

              <input
                type="file"
                accept="image/png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setHomeroomSignature(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              {/* Image preview */}
              {homeroomSignature && (
                <Box
                  mt="sm"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    padding: 8,
                    textAlign: "center",
                    background: "#f9f9f9",
                    width: 200,
                    height: 70,
                  }}
                >
                  <img
                    src={homeroomSignature}
                    alt="Homeroom Signature"
                    style={{ maxWidth: "100%", maxHeight: "100%"}}
                  />
                </Box>
              )}
            </Box>
            

            <Box style={{ width: 220 }}>
              <Text size="sm" fw={500} mb={4}>
                Principal Signature
              </Text>

              <input
                type="file"
                accept="image/png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPrincipalSignature(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              {/* Image preview */}
              {principalSignature && (
                <Box
                  mt="sm"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    padding: 8,
                    textAlign: "center",
                    background: "#f9f9f9",
                    width: 200,
                    height: 70,
                  }}
                >
                  <img
                    src={principalSignature}
                    alt="Principal Signature"
                    style={{ maxWidth: "100%", maxHeight: "100%"}}
                  />
                </Box>
              )}
            </Box>

          </Group>
        </Stack>
      </Box>

    </Stack>
  );
};