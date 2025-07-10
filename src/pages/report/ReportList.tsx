import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Button, Group, Stack, Table, Text, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { List } from "../../components/page/List";
import { ListHeader } from "../../components/page/List/ListHeader";
import { ImportExcel } from "../../components/ImportExcel";

export const ReportList: React.FC<IResourceComponentsProps> = () => {
  const [opened, { open, close }] = useDisclosure(false);

  // 🧪 Dummy data
  const reportData = [
    {
      name: "Feiby Fellisha Angelia",
      grade: "12 – Science B",
      id: "5877 / 0088639598",
      school_year: "2024/2025",
      semester: "1",
    },
    {
      name: "Clara Eunike",
      grade: "11 – Science A",
      id: "1234 / 0098765432",
      school_year: "2024/2025",
      semester: "1",
    },
  ];

  return (
    <>
      <List
        title="Student Report Card"
        headerButtonProps={{
          w: "100%",
          position: "apart",
        }}
        headerButtons={
          <Group spacing="sm">
            <Button onClick={open}>
              Generate Report Cards
            </Button>
          </Group>
        }
      >
        <ListHeader />

        <Stack mt="lg" spacing="md">
          {reportData.length === 0 ? (
            <Text c="dimmed" align="center">
              No data available. Please import a report card file.
            </Text>
          ) : (
            <Table withBorder highlightOnHover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Student ID</th>
                  <th>School Year</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.grade}</td>
                    <td>{student.id}</td>
                    <td>{student.school_year}</td>
                    <td>{student.semester}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Stack>
      </List>
      <Modal
        opened={opened}
        onClose={close}
        title="Import Report Cards"
        size="90%"
        centered
        styles={{
          header: {
            padding: "16px 24px",
            borderBottom: "1px solid #e9ecef",
          },
          body: {
            padding: 24,
          },
        }}
      >
        <ImportExcel />
      </Modal>
    </>
  );
};