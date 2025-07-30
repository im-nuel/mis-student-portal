import React from "react";
import { IResourceComponentsProps, LogicalFilter } from "@refinedev/core";
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
  Checkbox,
  Card,
  Flex,
  Text,
  Button,
} from "@mantine/core";
import { TextField } from "@refinedev/mantine";
import { StudentSchema } from "../../provider/schema/student.schema";
import { getActiveSchoolYear } from "../../components/utils/getActiveSchoolYear";
import { List } from "../../components/page/List";
import { ListHeader } from "../../components/page/List/ListHeader";
import { ColumnSorter } from "../../components/table/ColumnSorter";
import { ColumnFilter } from "../../components/table/ColumnFilter";
import { capitalizeString } from "../../components/utils/capitalized";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical } from "@tabler/icons-react";
import dayjs from "dayjs";
import { STUDENT_IMPORT_SCHEMA } from "../students/studentImportSchema";
import { ExportPDF } from "./ExportPDF";

// --- Custom sort order for grade ---
const gradeOrder = [
  "NSY", "KD1", "KD2",
  "G1", "G2", "G3", "G4", "G5", "G6",
  "G7", "G8", "G9", "G10", "G11", "G12",
];

// --- Custom sort order for grade ---
const sectionOrder = [
  "ECP", "ES", "MS", "HS",
];

const getLabelFromSchema = (key: keyof StudentSchema, value: string) => {
  return (
    STUDENT_IMPORT_SCHEMA[key]?.fieldType?.options?.find(
      (i: any) => i.value === value
    )?.label || value
  );
};

// All available columns
const allLogbookColumns: Record<string, ColumnDef<StudentSchema>> = {
  no: {
    id: "no",
    header: "No.",
    enableSorting: false,
    enableColumnFilter: false,
    cell: () => null, // will render manually using getRowModel().rows
  },
  photo: {
    id: "photo",
    header: "Photo",
    accessorKey: "profile_image_url",
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ getValue }) => {
      const url = getValue<string>();
      return (
        <Box
          component="img"
          src={url}
          alt="Student Photo"
          width={50}
          height={50}
          style={{ borderRadius: 6, objectFit: "cover" }}
          // onError={(e) => {
          //   (e.target as HTMLImageElement).src = "/default-avatar.png";
          // }}
        />
      );
    },
  },
  id: {
    id: "id",
    accessorKey: "id",
    header: "Student ID",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue }) => <TextField value={getValue<any>()} />,
  },
  student_name: {
    id: "student_name",
    header: "Name",
    accessorFn: (row) => {
      const last = row.last_name?.trim();
      const first = row.first_name?.trim();
      const middle = row.middle_name?.trim();
      return last
        ? `${last}, ${first} ${middle || ""}`.trim()
        : `${first} ${middle || ""}`.trim();
    },
    enableSorting: true,
    enableColumnFilter: false,
    sortingFn: (rowA, rowB) => {
      // ✅ Compare grade first
      const gradeA = rowA.original.grade;
      const gradeB = rowB.original.grade;
      const indexA = gradeOrder.indexOf(gradeA);
      const indexB = gradeOrder.indexOf(gradeB);

      if (indexA !== indexB) return indexA - indexB;

      // ✅ If same grade, then sort by name (last name → first name)
      const nameA = `${rowA.original.last_name || ""} ${rowA.original.first_name || ""}`.trim();
      const nameB = `${rowB.original.last_name || ""} ${rowB.original.first_name || ""}`.trim();

      return nameA.localeCompare(nameB);
    },

    cell: ({ getValue }) => (
      <TextField value={capitalizeString(getValue<string>())} />
    ),
  },
  grade: {
    id: "grade",
    accessorKey: "grade",
    header: "Grade",
    enableSorting: true,
    enableColumnFilter: true,
    sortingFn: (rowA, rowB) => {
      const a = rowA.getValue("grade") as string;
      const b = rowB.getValue("grade") as string;
      const indexA = gradeOrder.indexOf(a);
      const indexB = gradeOrder.indexOf(b);

      if (indexA === -1 && indexB === -1) {
        return String(a).localeCompare(String(b));
      }
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    },
  },
  section: {
    id: "section",
    accessorKey: "section",
    header: "Section",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue }) => {
      const value = getValue<any>();
      let label = value;
      let color = "gray";

      switch (value) {
        case "ES":
          color = "red";
          break;
        case "MS":
          color = "blue";
          break;
        case "HS":
          color = "yellow";
          break;
      }

      return <Badge color={color}>{label}</Badge>;
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.getValue("section") as string;
      const b = rowB.getValue("section") as string;
      const indexA = sectionOrder.indexOf(a);
      const indexB = sectionOrder.indexOf(b);

      if (indexA === -1 && indexB === -1) {
        return String(a).localeCompare(String(b));
      }
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    },
  },
  school_year: {
    id: "school_year",
    accessorKey: "school_year",
    header: "School Year",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue }) => (
      <Badge color={getValue() === getActiveSchoolYear() ? "green" : "red"}>
        {getValue<any>()}
      </Badge>
    ),
  },
  gender: {
    id: "gender",
    accessorKey: "gender",
    header: "Gender",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      const label = getLabelFromSchema("gender", value);
      return <TextField value={label} />;
    },
  },
  register_date: {
    id: "register_date",
    accessorKey: "register_date",
    header: "Date Enrolled",
    cell: ({ getValue }) => {
      const date = getValue<string>();
      return <TextField value={dayjs(date).format("DD MMM YYYY")} />;
    },
  },
  transportation: {
    id: "transportation",
    accessorKey: "transportation",
    header: "Transportation",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      const label = getLabelFromSchema("transportation", value);
      return <TextField value={label} />;
    },
  },
  nisn: {
    id: "nisn",
    accessorKey: "nisn",
    header: "NISN",
  },
  rank_in_family: {
    id: "rank_in_family",
    accessorKey: "rank_in_family",
    header: "Rank in Family",
  },
  place_dob: {
    id: "place_dob",
    header: "Place, DOB",
    accessorFn: (row) => row,
    cell: ({ getValue }) => {
      const row = getValue<StudentSchema>();
      const place = row.place_of_birth?.trim() || "-";
      const date = row.date_of_birth
        ? dayjs(row.date_of_birth).isValid()
          ? dayjs(row.date_of_birth).format("DD MMM YYYY")
          : "-"
        : "-";

      return <TextField value={`${place}, ${date}`} />;
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
  age: {
    id: "age",
    accessorKey: "age",
    header: "Age",
  },
  religion: {
    id: "religion",
    accessorKey: "religion",
    header: "Religion",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      const label = getLabelFromSchema("religion", value);
      return <TextField value={label} />;
    },
  },
  citizenship: {
    id: "citizenship",
    accessorKey: "citizenship",
    header: "Citizenship",
  },
  address: {
    id: "address",
    accessorKey: "address",
    header: "Address",
  },
  phone_number: {
    id: "phone_number",
    accessorKey: "phone_number",
    header: "Phone",
  },
  father_name: {
    id: "father_name",
    accessorKey: "father_name",
    header: "Father Name",
  },
  father_occupation: {
    id: "father_occupation",
    accessorKey: "father_occupation",
    header: "Father Occupation",
  },
  father_phone_number: {
    id: "father_phone_number",
    accessorKey: "father_phone_number",
    header: "Father Phone",
  },
  mother_name: {
    id: "mother_name",
    accessorKey: "mother_name",
    header: "Mother Name",
  },
  mother_occupation: {
    id: "mother_occupation",
    accessorKey: "mother_occupation",
    header: "Mother Occupation",
  },
  mother_phone_number: {
    id: "mother_phone_number",
    accessorKey: "mother_phone_number",
    header: "Mother Phone",
  },
  family_card_number: {
    id: "family_card_number",
    accessorKey: "family_card_number",
    header: "Family Card No.",
  },
};

// Sortable + toggleable item for column selector
const SortableItem = ({
  id,
  label,
  checked,
  onToggle,
}: {
  id: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    display: "inline-flex",
    alignItems: "center",
    paddingRight: "12px",
    width: "fit-content",
    whiteSpace: "nowrap",
  };

  return (
    <Box ref={setNodeRef} style={style}>
      <Group spacing="xs">
        <Box {...attributes} {...listeners}>
          <IconGripVertical size={16} />
        </Box>
        <Checkbox label={label} checked={checked} onChange={onToggle} />
      </Group>
    </Box>
  );
};

export const LogbookList: React.FC<IResourceComponentsProps> = () => {
  const allKeys = Object.keys(allLogbookColumns);

  const [columnOrder, setColumnOrder] = React.useState<string[]>([
    "no",
    "photo",
    "id",
    "student_name",
    "grade",
    "section",
    "school_year",
    "gender",
    "register_date",
    "transportation",
    "nisn",
    "rank_in_family",
    "place_dob",
    "age",
    "religion",
    "citizenship",
    "address",
    "phone_number",
    "father_name",
    "father_occupation",
    "father_phone_number",
    "mother_name",
    "mother_occupation",
    "mother_phone_number",
    "family_card_number",
  ]);
  const [visibleColumnKeys, setVisibleColumnKeys] = React.useState<string[]>([
    "no",
    "photo",
    "id",
    "student_name",
    "grade",
    "section",
    "school_year",
    "gender",
    "register_date",
    "transportation",
    "nisn",
    "rank_in_family",
    "place_dob",
    "age",
    "religion",
    "citizenship",
    "address",
    "phone_number",
    "father_name",
    "father_occupation",
    "father_phone_number",
    "mother_name",
    "mother_occupation",
    "mother_phone_number",
    "family_card_number",
  ]);

  const columns = React.useMemo<ColumnDef<StudentSchema>[]>(() => {
    return columnOrder
      .filter((key) => visibleColumnKeys.includes(key))
      .map((key) => allLogbookColumns[key]);
  }, [visibleColumnKeys, columnOrder]);

  const defaultSchoolYear = getActiveSchoolYear();

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: {
      tableQueryResult: { isFetching },
      filters,
    },
  } = useTable({
    refineCoreProps: {
      resource: "students",
      pagination: { mode: "off" },
      sorters: { mode: "off" },
      filters: {
        mode: "server",
        initial: [
          {
            field: "school_year",
            operator: "eq",
            value: defaultSchoolYear,
          },
          {
            field: "section",
            operator: "eq",
            value: "ECP",
          },
        ],
      },
    },
    initialState: {
      sorting: [{ id: "student_name", desc: false }],
      pagination: {
        pageSize: 5000,
        pageIndex: 0,
      },
    },
    columns,
  });

  const isLogicalFilter = (f: any): f is LogicalFilter => {
    return f && typeof f === "object" && "field" in f && "operator" in f && "value" in f;
  };

  const gradeFilter = (filters.find((f) => isLogicalFilter(f) && f.field === "grade") as LogicalFilter | undefined)?.value;
  const sectionFilter = (filters.find((f) => isLogicalFilter(f) && f.field === "section") as LogicalFilter | undefined)?.value;
  const schoolYearFilter = (filters.find((f) => isLogicalFilter(f) && f.field === "school_year") as LogicalFilter | undefined)?.value;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = columnOrder.indexOf(active.id);
      const newIndex = columnOrder.indexOf(over.id);
      setColumnOrder((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <List>
      <ListHeader />
      
      <Group spacing="sm" mt="md">
        <ExportPDF
          rows={getRowModel().rows}
          columnOrder={columnOrder}
          visibleColumnKeys={visibleColumnKeys}
          allLogbookColumns={allLogbookColumns}
          gradeFilter={gradeFilter}
          sectionFilter={sectionFilter}
          schoolYearFilter={schoolYearFilter}
        />
      </Group>

      <Card withBorder radius="md" mt="md" mb="md" p="md">
        <Text size="sm" weight={500} mb="xs">
            Select & Reorder Columns:
        </Text>
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={columnOrder} strategy={rectSortingStrategy}>
                <Flex wrap="wrap" gap="sm">
                    {columnOrder.map((key) => (
                        <SortableItem
                            key={key}
                            id={key}
                            label={allLogbookColumns[key].header as string}
                            checked={visibleColumnKeys.includes(key)}
                            onToggle={() => {
                                setVisibleColumnKeys((prev) =>
                                    prev.includes(key)
                                        ? prev.filter((k) => k !== key)
                                        : [...prev, key]
                                );
                            }}
                        />
                    ))}
                </Flex>
            </SortableContext>
        </DndContext>

        {/* Select / Unselect All */}
        <Group mt="sm">
            <Button
                size="xs"
                variant="light"
                onClick={() => setVisibleColumnKeys([...columnOrder])}
            >
                Select All
            </Button>
            <Button
                size="xs"
                variant="light"
                color="red"
                onClick={() => setVisibleColumnKeys([])}
            >
                Unselect All
            </Button>
        </Group>
    </Card>

      <ScrollArea mt="lg" pos="relative">
        <LoadingOverlay visible={isFetching} />
        <Table highlightOnHover withBorder sx={{ borderRadius: 8 }}>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
                          <ColumnFilter column={header.column} />
                        </Group>
                      </Group>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row, index) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {cell.column.id === "no"
                      ? index + 1
                      : flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </List>
  );
};
