import React, { useMemo } from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ScrollArea, Table, Pagination, Group } from "@mantine/core";
import {
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  TextField,
} from "@refinedev/mantine";
import { StudentSchema } from "../../provider/schema/student.schema";
import { ImportCSV } from "../../components/ImportCSV";
import { studentSchema } from "../../provider/schema/student";
import { FieldProps } from "../../components/ImportCSV/Content";
import { studentImportSchema } from "./studentImportSchema";

export const StudentList: React.FC<IResourceComponentsProps> = () => {
  const columns = React.useMemo<ColumnDef<StudentSchema>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Id",
      },
      {
        id: "student_id",
        accessorKey: "student_id",
        header: "Student ID",
        cell: function render({ getValue }) {
          return <TextField value={getValue<any>()} />;
        },
      },
      {
        id: "student_name",
        accessorKey: "first_name",
        header: "Name",
        cell: function render({ row }) {
          const student = row.original;
          const value = `${student.last_name}, ${student.first_name} ${student.last_name}`;
          return <TextField value={value} />;
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap>
              <ShowButton hideText recordItemId={getValue() as string} />
              <EditButton hideText recordItemId={getValue() as string} />
              <DeleteButton hideText recordItemId={getValue() as string} />
            </Group>
          );
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  const fields = useMemo<FieldProps[]>(() => {
    console.log(studentImportSchema);
    return studentImportSchema;
  }, []);

  return (
    <List
      headerButtons={
        <ImportCSV
          fields={fields}
          onSave={function (data: { [key: string]: any }): void {
            throw new Error("Function not implemented.");
          }}
        />
      }
    >
      <ScrollArea>
        <Table highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
      </ScrollArea>
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
    </List>
  );
};
