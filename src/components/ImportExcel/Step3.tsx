import {
  Box,
  Button,
  Divider,
  Group,
  NumberInput,
  Select,
  Slider,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import React, { useRef } from "react";
import { ReportCardPreview } from "./ReportCardPreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";

type SheetPreview = {
  sheetName: string;
  students: any[];
};

type Step3Props = {
  data: SheetPreview[];
  onBack: () => void;
  meta: {
    date: string;
    homeroom: string;
    principal: string;
    homeroomSignature: string;
    principalSignature: string;
  };
  setMeta: React.Dispatch<
    React.SetStateAction<{
      date: string;
      homeroom: string;
      principal: string;
      homeroomSignature: string;
      principalSignature: string;
    }>
  >;
  fontSettings: {
    fontSize: number;
    lineHeight: number;
  };
  setFontSettings: React.Dispatch<
    React.SetStateAction<{
      fontSize: number;
      lineHeight: number;
    }>
  >;
};

export const Step3: React.FC<Step3Props> = ({
  data,
  onBack,
  meta,
  setMeta,
  fontSettings,
  setFontSettings,
}) => {
  const { fontSize, lineHeight } = fontSettings;
  const [paperSize, setPaperSize] = React.useState<"A4" | "F4">("A4");
  const printRef = useRef<HTMLDivElement>(null);

  
  const handleDownload = async () => {
    const width = paperSize === "F4" ? 1248 : 1123;
    const height = 794;

    for (const sheet of data) {
      for (const student of sheet.students) {
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.left = "-9999px";
        document.body.appendChild(tempContainer);

        const node = document.createElement("div");
        tempContainer.appendChild(node);

        const el = (
          <ReportCardPreview
            student={student}
            paperSize={paperSize}
            fontSize={fontSettings.fontSize}
            lineHeight={fontSettings.lineHeight}
            date={meta.date}
            homeroom={meta.homeroom}
            principal={meta.principal}
            homeroomSignature={meta.homeroomSignature}
            principalSignature={meta.principalSignature}
          />
        );

        const root = createRoot(node);
        root.render(el);

        // Wait for DOM render
        await new Promise((resolve) => setTimeout(resolve, 800));

        const canvas = await html2canvas(node, {
          scale: 4,
          width,
          height,
          useCORS: true,
          backgroundColor: null,
        });

        const doc = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [width, height],
        });

        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        doc.addImage(imgData, "JPEG", 0, 0, width, height);

        const cleanName = student.name?.replace(/[/\\?%*:|"<>]/g, "-") || "Student";
        const cleanSemester = student.semester?.replace(/[/\\?%*:|"<>]/g, "-") || "Semester";

        doc.save(`${cleanName} (Sem ${cleanSemester} Report Card).pdf`);

        // Cleanup
        root.unmount();
        document.body.removeChild(tempContainer);
      }
    }
  };



  return (
    <Stack spacing="lg">
      <Group position="apart">
        <Group spacing="xs">
          <Button variant="default" onClick={onBack}>
            ← Back
          </Button>
          <Title order={5}>Step 3 of 3 – Preview Report Cards</Title>
        </Group>
        <Group spacing="xs">
          <Select
            size="xs"
            value={paperSize}
            onChange={(val) => setPaperSize(val as "A4" | "F4")}
            data={[{ label: "A4 (210 × 297 mm)", value: "A4" }]}
            allowDeselect={false}
            withinPortal={false}
            styles={{ root: { minWidth: 120 } }}
          />
          <Button leftIcon={<IconDownload size={16} />} onClick={handleDownload}>
            Download PDF
          </Button>
        </Group>
      </Group>

      {/* Adjustment Panel */}
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
            <Stack style={{ flex: 1 }} spacing="md">
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
                    onChange={(val) =>
                      setFontSettings((prev) => ({ ...prev, fontSize: val }))
                    }
                  />
                  <NumberInput
                    min={5}
                    max={20}
                    step={1}
                    value={fontSize}
                    onChange={(val) =>
                      typeof val === "number" &&
                      setFontSettings((prev) => ({
                        ...prev,
                        fontSize: val,
                      }))
                    }
                    w={70}
                    size="xs"
                  />
                </Group>
              </Box>

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
                    onChange={(val) =>
                      setFontSettings((prev) => ({
                        ...prev,
                        lineHeight: val,
                      }))
                    }
                  />
                  <NumberInput
                    min={0.5}
                    max={3}
                    step={0.1}
                    precision={1}
                    value={lineHeight}
                    onChange={(val) =>
                      typeof val === "number" &&
                      setFontSettings((prev) => ({
                        ...prev,
                        lineHeight: val,
                      }))
                    }
                    w={70}
                    size="xs"
                  />
                </Group>
              </Box>
            </Stack>

            {/* Meta inputs */}
            <Box style={{ width: 220 }}>
              <Text size="sm" fw={500} mb={4}>
                Signature Date
              </Text>
              <TextInput
                placeholder="e.g. July 10, 2025"
                size="sm"
                value={meta.date}
                onChange={(e) =>
                  setMeta((prev) => ({ ...prev, date: e.target.value }))
                }
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
                    reader.onloadend = () =>
                      setMeta((prev) => ({
                        ...prev,
                        homeroomSignature: reader.result as string,
                      }));
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {meta.homeroomSignature && (
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
                    src={meta.homeroomSignature}
                    alt="Homeroom Signature"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </Box>
              )}

              <Text size="sm" pt="xs" fw={500} mb={4}>
                Homeroom Advisor
              </Text>
              <TextInput
                placeholder="Homeroom Advisor Name"
                size="sm"
                value={meta.homeroom}
                onChange={(e) =>
                  setMeta((prev) => ({ ...prev, homeroom: e.target.value }))
                }
              />
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
                    reader.onloadend = () =>
                      setMeta((prev) => ({
                        ...prev,
                        principalSignature: reader.result as string,
                      }));
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {meta.principalSignature && (
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
                    src={meta.principalSignature}
                    alt="Principal Signature"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </Box>
              )}

              <Text size="sm" pt="xs" fw={500} mb={4}>
                Principal
              </Text>
              <TextInput
                placeholder="Principal Name"
                size="sm"
                value={meta.principal}
                onChange={(e) =>
                  setMeta((prev) => ({ ...prev, principal: e.target.value }))
                }
              />
            </Box>
          </Group>
        </Stack>
      </Box>

      <Box
        ref={printRef}
        style={{
          overflow: "auto",
          maxHeight: "calc(100vh - 160px)",
          padding: 16,
          background: "#f8f9fa",
        }}
      >
        {data.map((sheet, si) => (
          <Box key={si} mb="xl">
            <Title order={6} mb="sm" style={{ textTransform: "uppercase" }}>
              Sheet: {sheet.sheetName}
            </Title>
            {sheet.students.map((student, index) => (
              <ReportCardPreview
                key={index}
                student={student}
                paperSize={paperSize}
                fontSize={fontSize}
                lineHeight={lineHeight}
                date={meta.date}
                homeroom={meta.homeroom}
                principal={meta.principal}
                homeroomSignature={meta.homeroomSignature}
                principalSignature={meta.principalSignature}
              />
            ))}
            <Divider mt="lg" />
          </Box>
        ))}
      </Box>
    </Stack>
  );
};