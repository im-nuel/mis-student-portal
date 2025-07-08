import React from "react";
import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Group,
    LoadingOverlay,
    Modal,
    ScrollArea,
    Select,
    Table,
    Tooltip,
} from "@mantine/core";
import { IconUpload, IconInfoCircle } from "@tabler/icons-react";
import { StudentSchema } from "../../provider/schema/student.schema";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { STUDENT_IMPORT_SCHEMA } from "../students/studentImportSchema";

(pdfMake as any).vfs = (pdfFonts as any).vfs;

const getBase64FromUrl = async (url: string): Promise<string | null> => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();

        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Failed to load image", url, error);
        return null;
    }
};

const getLabelFromSchema = (key: keyof StudentSchema, value: string) => {
    return (
        STUDENT_IMPORT_SCHEMA[key]?.fieldType?.options?.find(
            (i: any) => i.value === value
        )?.label || value
    );
};

interface ExportPDFProps {
    rows: ReturnType<ReturnType<typeof import("@refinedev/react-table").useTable>["getRowModel"]>["rows"];
    columnOrder: string[];
    visibleColumnKeys: string[];
    allLogbookColumns: Record<string, ColumnDef<StudentSchema>>;
    gradeFilter?: string;
    sectionFilter?: string;
    schoolYearFilter?: string;
}

export const ExportPDF: React.FC<ExportPDFProps> = ({
    rows,
    columnOrder,
    visibleColumnKeys,
    allLogbookColumns,
    gradeFilter,
    sectionFilter,
    schoolYearFilter
}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [showAll, setShowAll] = React.useState(false);
    React.useEffect(() => {
    if (opened) {
        setShowAll(false);
    }
    }, [opened]);

    const [isDownloading, setIsDownloading] = React.useState(false);
    const [paperSize, setPaperSize] = React.useState<"A4" | "F4">("F4");

    const excludeColumns: string[] = [];

    if (gradeFilter) excludeColumns.push("grade");
    if (sectionFilter) excludeColumns.push("section");
    if (schoolYearFilter) excludeColumns.push("school_year");

    const columnsToExport = columnOrder.filter(
        (key) => visibleColumnKeys.includes(key) && !excludeColumns.includes(key)
    );

    const filterTitleParts = [
        gradeFilter ? `Grade: ${gradeFilter}` : null,
        sectionFilter ? `Section: ${sectionFilter}` : null,
        schoolYearFilter ? `School Year: ${schoolYearFilter}` : null,
    ].filter(Boolean);

    const subtitle = filterTitleParts.length > 0 ? `(${filterTitleParts.join(", ")})` : "";

    const handleDownload = async () => {
        setIsDownloading(true);

        const header = columnsToExport.map((key) => {
            const column = allLogbookColumns[key];
            return {
                text: typeof column.header === "function" ? column.id : (column.header as string),
                bold: true,
            };
        });

        const body: any[] = [header];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowData: any[] = [];

            for (const key of columnsToExport) {
                const cell = row.getVisibleCells().find((c) => c.column.id === key);
                if (!cell) {
                    rowData.push("");
                    continue;
                }

                const value = cell.getContext().getValue();

                if (key === "no") {
                    rowData.push(i + 1);
                } else if (key === "place_dob" && value && typeof value === "object" && "place_of_birth" in value && "date_of_birth" in value) {
                    const place = (value as StudentSchema).place_of_birth;
                    const dobRaw = (value as StudentSchema).date_of_birth as unknown;

                    const date =
                        typeof dobRaw === "string" ||
                        typeof dobRaw === "number" ||
                        (typeof dobRaw === "object" && dobRaw instanceof Date)
                            ? dayjs(dobRaw).format("DD/MM/YY")
                            : "-";

                    rowData.push(`${place}, ${date}`);
                } else if (key === "register_date") {
                    const registerRaw = value as unknown;

                    const register =
                        typeof registerRaw === "string" ||
                        typeof registerRaw === "number" ||
                        (typeof registerRaw === "object" && registerRaw instanceof Date)
                            ? dayjs(registerRaw).format("DD/MM/YY")
                            : "-";

                    rowData.push(register);
                } else if (key === "photo") {
                    if (typeof value === "string" && value.startsWith("http")) {
                        try {
                            const base64: string | null = await getBase64FromUrl(value);
                            if (base64 && base64.startsWith("data:image")) {
                                rowData.push({ image: base64, fit: [25, 25] });
                            } else {
                                rowData.push("");
                            }
                        } catch (error) {
                            console.warn("Failed to fetch or convert image", value, error);
                            rowData.push("");
                        }
                    } else {
                        rowData.push("");
                    }
                } else if (key === "gender" || key === "transportation" || key === "religion") {
                    const label = getLabelFromSchema(key, value as string);
                    rowData.push(label ?? "");
                } else {
                    rowData.push(value ?? "");
                }
            }

            body.push(rowData);
        }

        const mmToPt = (mm: number) => mm * 2.83465;

        const docDefinition = {
            pageSize: paperSize === "A4"
                ? "A4"
                : { width: mmToPt(210), height: mmToPt(330) },
            pageOrientation: "landscape" as const,
            content: [
                {
                columns: [
                    {
                    width: "*",
                    text: `Student Logbook ${subtitle}`,
                    style: "header",
                    noWrap: true,
                    },
                    {
                    width: "auto",
                    text: `Created: ${dayjs().format("DD/MM/YYYY")}`,
                    alignment: "right",
                    italics: true,
                    fontSize: 9,
                    margin: [0, 2, 0, 0],
                    noWrap: true,
                    },
                ],
                columnGap: 10,
                margin: [0, 0, 0, 10],
                },
                {
                table: {
                    headerRows: 1,
                    widths: columnsToExport.map(() => "auto"),
                    body,
                },
                layout: {
                    fillColor: (rowIndex: number) => (rowIndex === 0 ? "#f5f5f5" : null),
                },
                style: "tableStyle",
                },
            ],
            styles: {
                header: {
                fontSize: 15,
                bold: true,
                alignment: "left",
                },
                tableStyle: {
                fontSize: 5.5,
                margin: [0, 1, 0, 1],
                },
            },
            defaultStyle: {
                fontSize: 5.5,
            },
        };


        pdfMake.createPdf(docDefinition).download(`Student_Logbook_${paperSize}.pdf`);
        setIsDownloading(false);
    };

    return (
        <>
            <Button leftIcon={<IconUpload size={16} />} onClick={() => open()}>
                Export PDF
            </Button>
            <Modal
                title={`Export Student Logbook ${subtitle}`}
                opened={opened}
                onClose={close}
                size="xl"
                styles={{ body: { overflowX: "auto" } }}
            >
                <Box my="md">
                    <LoadingOverlay visible={isDownloading} />
                    <ScrollArea type="always">
                        <Table withBorder highlightOnHover>
                            <thead>
                                <tr>
                                    {columnsToExport.map((key) => (
                                        <th key={key} style={{ whiteSpace: "nowrap", textAlign: "left", minWidth: 80 }}>
                                            {typeof allLogbookColumns[key]?.header === "function"
                                                ? allLogbookColumns[key]?.id
                                                : (allLogbookColumns[key]?.header as string)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {(showAll ? rows : rows.slice(0, 10)).map((row, index) => (
                                    <tr key={row.id}>
                                        {columnsToExport.map((key) => {
                                            const cell = row.getVisibleCells().find((c) => c.column.id === key);
                                            return (
                                                <td key={key} style={{ whiteSpace: "nowrap", verticalAlign: "top" }}>
                                                    {cell
                                                        ? key === "no"
                                                            ? index + 1
                                                            : flexRender(cell.column.columnDef.cell, cell.getContext())
                                                        : ""}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                                {!showAll && rows.length > 10 && (
                                    <tr>
                                        <td
                                            colSpan={columnsToExport.length}
                                            style={{
                                            textAlign: "left",
                                            paddingBottom: "1rem", // = mb="md"
                                            }}
                                        >
                                            <Button
                                            variant="subtle"
                                            compact
                                            size="xs"
                                            onClick={() => setShowAll(true)}
                                            >
                                            + {rows.length - 10} more
                                            </Button>
                                        </td>
                                        </tr>
                                )}
                            </tbody>
                        </Table>
                    </ScrollArea>
                </Box>
                <Group position="apart" mt="md">
                    <Select
                        label="Paper Size"
                        value={paperSize}
                        onChange={(val) => setPaperSize(val as "A4" | "F4")}
                        data={[
                            { value: "A4", label: "A4 (210×297mm)" },
                            { value: "F4", label: "F4 (210×330mm)" },
                        ]}
                        style={{ maxWidth: 200 }}
                    />
                    <Group>
                        <Tooltip label="PDF is limited to 2000 rows for performance" position="left" withArrow withinPortal color="gray">
                            <ActionIcon>
                                <IconInfoCircle />
                            </ActionIcon>
                        </Tooltip>
                        <Button loading={isDownloading} onClick={handleDownload}>
                            Download PDF
                        </Button>
                    </Group>
                </Group>
            </Modal>
        </>
    );
};