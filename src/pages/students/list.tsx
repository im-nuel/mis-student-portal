import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
  ScrollArea,
  Table,
  Pagination,
  Group,
  Box,
  Badge,
} from "@mantine/core";
import {
  EditButton,
  ShowButton,
  DeleteButton,
  TextField,
  CreateButton,
} from "@refinedev/mantine";
import { StudentSchema } from "../../provider/schema/student.schema";
import { ImportCSV } from "./ImportCSV";
import { ColumnSorter } from "../../components/table/ColumnSorter";
import { ColumnFilter } from "../../components/table/ColumnFilter";
import { getActiveSchoolYear } from "../../components/utils/getActiveSchoolYear";
import { List } from "../../components/page/List";
import { ListHeader } from "../../components/page/List/ListHeader";

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
          const value = `${student.last_name}, ${student.first_name} ${student.middle_name}`;
          return <TextField value={value} />;
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
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        enableColumnFilter: false,
        enableSorting: false,
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
    initialState: {
      pagination: {
        pageSize: 100,
      },
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <List
      headerButtons={
        <>
          <ImportCSV />
          <CreateButton />
        </>
      }
    >
      <ListHeader />
      <ScrollArea>
        <Table highlightOnHover>
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
                          <Group spacing="xs" noWrap>
                            <ColumnSorter column={header.column} />
                          </Group>
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
