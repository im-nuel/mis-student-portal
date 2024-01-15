import { Box, Button, Title } from "@mantine/core";
import { FC, useMemo } from "react";
import { Table } from "./Table";
import { Column, ColumnOrColumnGroup } from "react-data-grid";

export const ValidationPage: FC<{
  data: { [key: string]: any }[];
  onConfirm: () => void;
}> = ({ data, onConfirm }) => {
  const columns = useMemo(() => {
    return Object.keys(data[0]).map<Column<{ [key: string]: any }>>((key) => ({
      key,
      name: key,
      renderHeaderCell: (props) => {
        return (
          <Box sx={{ textTransform: "uppercase", fontSize: 12 }}>
            {props.column.name}
          </Box>
        );
      },
    }));
  }, [data]);
  return (
    <>
      <Box p="lg">
        <Title order={2} mb={"lg"}>
          Validating Data
        </Title>
      </Box>
      <Box px="lg">
        <Table columns={columns} rows={data} />
      </Box>
      <Box
        p={"lg"}
        bg={"gray.0"}
        sx={{ textAlign: "center", borderRadius: "0px 0px 8px 8px" }}
      >
        <Button size="lg" w={"25%"} onClick={() => onConfirm()}>
          Confirm
        </Button>
      </Box>
    </>
  );
};
