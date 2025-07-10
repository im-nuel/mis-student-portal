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
      <Title order={5} mb="xs">{label}</Title>
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
  onNext: (templateStructure: {
    major: string[];
    elective: string[];
  }) => void;
};

export const Step1: React.FC<ReportCardStep1Props> = ({ onNext }) => {
  const [majorSubjects, setMajorSubjects] = React.useState<string[]>([""]);
  const [electiveSubjects, setElectiveSubjects] = React.useState<string[]>([""]);

  const handleDownloadTemplate = () => {
    const maxLength = Math.max(majorSubjects.length, electiveSubjects.length);
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
      major_subject: majorSubjects[i] || "",
      major_credit: "",
      major_academic_value: "",
      major_academic_level: "",
      major_academic_point: "",
      major_behavior_value: "",
      major_behavior_level: "",
      major_behavior_remarks: "",
      elective_subject: electiveSubjects[i] || "",
      elective_credit: "",
      elective_academic_value: "",
      elective_academic_level: "",
      elective_academic_point: "",
      elective_behavior_value: "",
      elective_behavior_level: "",
      elective_behavior_remarks: "",
    }));

    // ✅ This must be an array of objects
    const worksheet = XLSX.utils.json_to_sheet(templateRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Change to Student ID");
    const blob = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([blob]), "Student_Report_Card_Template.xlsx");
  };

  const handleNext = () => {
    onNext({
      major: majorSubjects.filter((s) => s.trim() !== ""),
      elective: electiveSubjects.filter((s) => s.trim() !== ""),
    });
  };

  return (
    <Stack spacing="xl">
      <Text size="sm" color="dimmed">
        Step 1 of 2 – Configure your Report Card Template by entering subject names.
      </Text>

      <SubjectInput
        label="Major Subjects"
        subjects={majorSubjects}
        setSubjects={setMajorSubjects}
      />
      <SubjectInput
        label="Elective Subjects"
        subjects={electiveSubjects}
        setSubjects={setElectiveSubjects}
      />

      <Group position="apart" mt="xl">
        <Button variant="default" onClick={handleDownloadTemplate}>
          Download Template
        </Button>
        <Button onClick={handleNext}>
          Next
        </Button>
      </Group>
    </Stack>
  );
};