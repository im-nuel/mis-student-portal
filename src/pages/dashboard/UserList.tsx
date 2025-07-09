import { Badge, Box, Group, Table, Text } from "@mantine/core";
import React from "react";
import { useDashboardContext } from "./context";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { StudentSchema } from "../../provider/schema/student.schema";
import { TextField } from "@refinedev/mantine";
import { capitalizeString } from "../../components/utils/capitalized";
import { getActiveSchoolYear } from "../../components/utils/getActiveSchoolYear";

export const UserList: React.FC = () => {
  const { section } = useDashboardContext();
  const columns = React.useMemo<ColumnDef<StudentSchema>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Student ID",
        cell: function render({ getValue }) {
          return <TextField value={getValue<any>()} />;
        },
      },
      {
        id: "student_name",
        accessorKey: "first_name",
        header: "Name",
        enableSorting: false,
        cell: function render({ row }) {
          const student = row.original;
          const value = capitalizeString(
            `${!!student.last_name ? student.last_name + ", " : ""}${
              student.first_name
            }${student.middle_name ? ` ${student.middle_name}` : ""}`
          );
          return <TextField value={value} />;
        },
      },
      {
        id: "grade",
        accessorKey: "grade",
        header: "Grade",
      },
      {
        id: "section",
        accessorKey: "section",
        header: "Section",
        cell: function render({ getValue }) {
          const value: StudentSchema["section"] = getValue<any>();
          const display = {
            label: "",
            color: "",
          };
          switch (value) {
            case "ECP":
              display.label = "Early Childhood Program";
              display.color = "gray";
              break;
            case "ES":
              display.label = "Elementary School";
              display.color = "red";
              break;
            case "MS":
              display.label = "Middle School";
              display.color = "blue";
              break;
            case "HS":
              display.label = "High School";
              display.color = "yellow";
              break;
          }
          return <Badge color={display.color}>{value}</Badge>;
        },
      },
      {
        id: "school_year",
        accessorKey: "school_year",
        header: "School Year",
        cell: function render({ getValue }) {
          return (
            <Badge
              color={getValue() === getActiveSchoolYear() ? "green" : "red"}
            >
              {getValue<any>()}
            </Badge>
          );
        },
      },
    ],
    []
  );

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: section.latest.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Text weight={"bold"}>Latest Students</Text>
      <Table mt={"sm"} highlightOnHover sx={{ borderRadius: 8 }}>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id}>
                    {!header.isPlaceholder && (
                      <Group spacing="xs" noWrap>
                        <Box>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Box>
                      </Group>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
