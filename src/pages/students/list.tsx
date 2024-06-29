import React from "react";
import { IResourceComponentsProps, useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
  ScrollArea,
  Table,
  Pagination,
  Group,
  Box,
  Badge,
  LoadingOverlay,
  ActionIcon,
  Flex,
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
import { SearchField } from "../../components/page/List/SearchField";
import _capitalize from "lodash/capitalize";
import { capitalizeString } from "../../components/utils/capitalized";
import { IconFilterCancel } from "@tabler/icons-react";
import { ExportCSV } from "./ExportCSV";

const SEARCH_FILTER_FIELDS = ["id", "last_name", "first_name", "middle_name"];

export const StudentList: React.FC<IResourceComponentsProps> = () => {
  const { show } = useNavigation();
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
    refineCore: {
      filters,
      setFilters,
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { isLoading, isFetching },
    },
  } = useTable({
    columns,
    initialState: {
      sorting: [
        {
          id: "id",
          desc: true,
        },
      ],
      pagination: {
        pageSize: 20,
      },
    },
  });

  // setOptions((prev) => ({
  //   ...prev,
  //   meta: {
  //     ...prev.meta,
  //   },
  // }));

  return (
    <List
      headerButtonProps={{
        w: "100%",
        position: "apart",
      }}
      headerButtons={
        <>
          <Flex w="100%" maw={"400px"}>
            <SearchField
              placeholder="Search Student"
              resource="students"
              filters={SEARCH_FILTER_FIELDS}
              onSubmit={(value) => {
                setFilters([
                  {
                    field: "q",
                    operator: "eq",
                    value: value,
                  },
                  {
                    field: "qf",
                    operator: "eq",
                    value: SEARCH_FILTER_FIELDS.join(","),
                  },
                ]);
              }}
              onItemSubmit={(d) => {
                show("students", d.data.id);
              }}
            />
            <ActionIcon
              hidden={!(filters.length > 0)}
              ml={"xs"}
              size={"lg"}
              onClick={() => {
                setFilters([], "replace");
              }}
            >
              <IconFilterCancel size={18} />
            </ActionIcon>
          </Flex>
          <Group spacing="sm">
            <ImportCSV />
            <CreateButton />
            <ExportCSV />
          </Group>
        </>
      }
    >
      <ListHeader />
      <ScrollArea mt="lg" pos="relative">
        <LoadingOverlay visible={isFetching} />
        <Table highlightOnHover withBorder sx={{ borderRadius: 8 }}>
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
