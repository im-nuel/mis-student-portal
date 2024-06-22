import React from "react";
import _ from "lodash";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDataProvider, useList, useParsed } from "@refinedev/core";
import { IconDownload, IconInfoCircle } from "@tabler/icons-react";
import { StudentSchema } from "../../provider/schema/student.schema";
import { capitalizeString } from "../../components/utils/capitalized";

export const ExportCSV = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { params } = useParsed();
  const [isDownloading, { open: startDownloading, close: stopDownloading }] =
    useDisclosure(false);
  const dataProvider = useDataProvider();
  const { data: previewData, isFetching } = useList<StudentSchema>({
    resource: "students",
    pagination: {
      pageSize: 10,
    },
    sorters: params?.sorters,
    filters: params?.filters,
  });

  const handleDownload = React.useCallback(async () => {
    startDownloading();
    const records = await dataProvider().getList({
      resource: "students",
      pagination: {
        pageSize: 1000,
      },
      sorters: params?.sorters,
      filters: params?.filters,
    });

    const headers = _.keys(records.data[0]);
    const csvRows = [
      headers.join(","), // Header row
      ...records.data.map((row) =>
        headers.map((fieldName) => _.escape(row[fieldName])).join(",")
      ),
    ].join("\n");

    // Create a Blob from the CSV string
    const blob = new Blob([csvRows], { type: "text/csv" });

    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Students_${records.data[0].id}-${
      records.data[records.data.length - 1].id
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    stopDownloading();
  }, [params?.sorters, params?.filters]);

  return (
    <>
      <Button leftIcon={<IconDownload size={16} />} onClick={open}>
        Export CSV
      </Button>
      <Modal
        title="Export Data"
        opened={opened}
        onClose={() => close()}
        size={"lg"}
      >
        <Box my={"md"}>
          <LoadingOverlay visible={isFetching} />
          <Table withBorder>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Section</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {previewData?.data.map(
                ({
                  id,
                  first_name,
                  middle_name,
                  last_name,
                  section,
                  grade,
                }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>
                      {capitalizeString(
                        `${!!last_name ? last_name + ", " : ""}${first_name}${
                          middle_name ? ` ${middle_name}` : ""
                        }`
                      )}
                    </td>
                    <td>
                      <Badge
                        color={SECTION_STYLE[section].color}
                        title={SECTION_STYLE[section].label}
                      >
                        {section}
                      </Badge>
                    </td>
                    <td>{grade}</td>
                  </tr>
                )
              )}
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  +{" "}
                  {(previewData?.total || 0) - (previewData?.data.length || 0)}{" "}
                  more
                </td>
              </tr>
            </tbody>
          </Table>
        </Box>
        <Group position="apart">
          <Tooltip
            label="Data is limited to 1000 row due to server performance."
            position="left"
            withArrow
            withinPortal
            color="gray"
          >
            <ActionIcon>
              <IconInfoCircle />
            </ActionIcon>
          </Tooltip>
          <Button loading={isDownloading} onClick={handleDownload}>
            Download CSV
          </Button>
        </Group>
      </Modal>
    </>
  );
};

const SECTION_STYLE = {
  ECP: {
    label: "Early Childhood Program",
    color: "gray",
  },
  ES: {
    label: "Elementary School",
    color: "red",
  },
  MS: {
    label: "Middle School",
    color: "blue",
  },
  HS: {
    label: "High School",
    color: "yellow",
  },
};
