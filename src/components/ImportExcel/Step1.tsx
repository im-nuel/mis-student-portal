import React from "react";
import {
  Box,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type SubjectInputProps = {
  label: string;
  subjects: string[];
  setSubjects: (data: string[]) => void;
};

const SubjectInput: React.FC<SubjectInputProps> = ({
  label,
  subjects,
  setSubjects,
}) => {
  const handleChange = (index: number, value: string) => {
    const updated = [...subjects];
    updated[index] = value;
    setSubjects(updated);
  };

  const handleAdd = () => setSubjects([...subjects, ""]);
  const handleRemove = (index: number) =>
    setSubjects(subjects.filter((_, i) => i !== index));

  return (
    <Box>
      <Title order={4} mb="xs">{label}</Title>
      <Stack spacing="xs">
        {subjects.map((value, index) => (
          <Group key={index} spacing="xs">
            <TextInput
              value={value}
              onChange={(e) => handleChange(index, e.currentTarget.value)}
              placeholder={`Subject ${index + 1}`}
              sx={{ flex: 1 }}
              size="xs"
            />
            <Button
              variant="subtle"
              color="red"
              size="xs"
              onClick={() => handleRemove(index)}
            >
              <IconX size={16} />
            </Button>
          </Group>
        ))}
        <Button
          variant="light"
          size="xs"
          leftIcon={<IconPlus size={14} />}
          onClick={handleAdd}
        >
          Add {label}
        </Button>
      </Stack>
    </Box>
  );
};

type ReportCardStep1Props = {
  major: string[];
  elective: string[];
  setMajor: (val: string[]) => void;
  setElective: (val: string[]) => void;
  onNext: (templateStructure: {
    major: string[];
    elective: string[];
  }) => void;
};

export const Step1: React.FC<ReportCardStep1Props> = ({
  major,
  elective,
  setMajor,
  setElective,
  onNext,
}) => {
  const handleDownloadTemplate = () => {
    const maxLength = Math.max(major.length, elective.length);
    const templateRows = Array.from({ length: maxLength }).map((_, i) => ({
      id: "",
      name: "",
      grade: "",
      nisn: "",
      semester: "",
      gpa: "",
      sick: "",
      excuse: "",
      late: "",
      absent: "",
      notes: "",
      major_subject: major[i] || "",
      major_credit: "",
      major_academic_value: "",
      major_academic_level: "",
      major_academic_point: "",
      major_behavior_value: "",
      major_behavior_level: "",
      major_behavior_remarks: "",
      elective_subject: elective[i] || "",
      elective_credit: "",
      elective_academic_value: "",
      elective_academic_level: "",
      elective_academic_point: "",
      elective_behavior_value: "",
      elective_behavior_level: "",
      elective_behavior_remarks: "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(templateRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Change to Student ID");
    const blob = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([blob]), "Student_Report_Card_Template.xlsx");
  };

  const handleNext = () => {
    onNext({
      major: major.filter((s) => s.trim() !== ""),
      elective: elective.filter((s) => s.trim() !== ""),
    });
  };

  return (
    <Stack spacing="xl">
      <Title order={5}>Step 1 of 3 – Configure your Report Card Template by entering subject names.</Title>

      <SubjectInput label="Major Subjects" subjects={major} setSubjects={setMajor} />
      <SubjectInput label="Elective Subjects" subjects={elective} setSubjects={setElective} />

      <Group position="apart" mt="xl">
        <Button variant="default" onClick={handleDownloadTemplate}>
          Download Template
        </Button>
        <Button onClick={handleNext}>Next →</Button>
      </Group>
    </Stack>
  );
};
