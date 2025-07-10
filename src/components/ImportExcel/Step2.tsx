import {
  Box,
  Button,
  Group,
  Loader,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
  IconUpload,
  IconX,
  IconFileSpreadsheet,
} from "@tabler/icons-react";
import React, { useState } from "react";
import * as XLSX from "xlsx";

type Step2Props = {
  onNext: (rows: any[]) => void;
};

export const Step2: React.FC<Step2Props> = ({ onNext }) => {
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExcel = async (file: File) => {
    try {
      setLoading(true);
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array" });
      setWorkbook(wb);
      setSheetNames(wb.SheetNames);
    } catch (error) {
      console.error("Error reading Excel file", error);
    } finally {
      setLoading(false);
    }
  };

  const transformRows = (rows: string[][]) => {
    const [header, ...dataRows] = rows;
    const students: Record<string, any> = {};
    let currentKey: string | null = null;

    for (const row of dataRows) {
      const entry: Record<string, string> = {};
      header.forEach((col, i) => {
        entry[col] = String(row[i] ?? "").trim();
      });

      const hasIdAndName = entry.id && entry.name;
      if (hasIdAndName) {
        currentKey = `${entry.id}-${entry.name}`;
        if (!students[currentKey]) {
          students[currentKey] = {
            id: entry.id,
            name: entry.name,
            grade: entry.grade,
            nisn: entry.nisn,
            semester: entry.semester,
            gpa: entry.gpa,
            sick: entry.sick,
            excuse: entry.excuse,
            late: entry.late,
            absent: entry.absent,
            notes: entry.notes,
            major_subject: [],
            major_credit: [],
            major_academic_value: [],
            major_academic_level: [],
            major_academic_point: [],
            major_behavior_value: [],
            major_behavior_level: [],
            major_behavior_remarks: [],
            elective_subject: [],
            elective_credit: [],
            elective_academic_value: [],
            elective_academic_level: [],
            elective_academic_point: [],
            elective_behavior_value: [],
            elective_behavior_level: [],
            elective_behavior_remarks: [],
          };
        }
      }

      if (!currentKey) continue;

      const student = students[currentKey];

      // Push subject info
      if (entry.major_subject) student.major_subject.push(entry.major_subject);
      if (entry.major_credit) student.major_credit.push(entry.major_credit);
      if (entry.major_academic_value) student.major_academic_value.push(entry.major_academic_value);
      if (entry.major_academic_level) student.major_academic_level.push(entry.major_academic_level);
      if (entry.major_academic_point) student.major_academic_point.push(entry.major_academic_point);
      if (entry.major_behavior_value) student.major_behavior_value.push(entry.major_behavior_value);
      if (entry.major_behavior_level) student.major_behavior_level.push(entry.major_behavior_level);
      if (entry.major_behavior_remarks) student.major_behavior_remarks.push(entry.major_behavior_remarks);
      
      if (entry.elective_subject) student.elective_subject.push(entry.elective_subject);
      if (entry.elective_credit) student.elective_credit.push(entry.elective_credit);
      if (entry.elective_academic_value) student.elective_academic_value.push(entry.elective_academic_value);
      if (entry.elective_academic_level) student.elective_academic_level.push(entry.elective_academic_level);
      if (entry.elective_academic_point) student.elective_academic_point.push(entry.elective_academic_point);
      if (entry.elective_behavior_value) student.elective_behavior_value.push(entry.elective_behavior_value);
      if (entry.elective_behavior_level) student.elective_behavior_level.push(entry.elective_behavior_level);
      if (entry.elective_behavior_remarks) student.elective_behavior_remarks.push(entry.elective_behavior_remarks);
    }

    return Object.values(students);
  };

  const handleProcess = () => {
    if (!workbook || !selectedSheet) return;
    const sheet = workbook.Sheets[selectedSheet];
    const rows = XLSX.utils.sheet_to_json<string[]>(sheet, {
      header: 1,
      blankrows: false,
    });

    const transformed = transformRows(rows);
    onNext(transformed);
  };

  return (
    <Stack spacing="lg">
      <Text size="sm" color="dimmed">
        Step 2 – Upload the completed Report Card Excel and select the sheet to process.
      </Text>

      <Dropzone
        onDrop={(files) => handleExcel(files[0])}
        accept={[MIME_TYPES.xlsx]}
        maxFiles={1}
        multiple={false}
        loading={loading}
      >
        <Group
          position="center"
          spacing="xs"
          style={{ minHeight: 120, pointerEvents: "none" }}
        >
          <IconUpload size={32} stroke={1.5} />
          <div>
            <Text size="sm">Drag Excel file here or click to upload</Text>
            <Text size="xs" color="dimmed">Only .xlsx files are supported</Text>
          </div>
        </Group>
      </Dropzone>

      {loading && (
        <Group>
          <Loader size="sm" />
          <Text>Loading Excel...</Text>
        </Group>
      )}

      {sheetNames.length > 0 && (
        <Select
          label="Select Sheet"
          data={sheetNames}
          value={selectedSheet}
          onChange={setSelectedSheet}
        />
      )}

      <Group position="right">
        <Button disabled={!selectedSheet} onClick={handleProcess}>
          Next
        </Button>
      </Group>
    </Stack>
  );
};