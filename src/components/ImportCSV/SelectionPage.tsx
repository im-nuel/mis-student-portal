import {
  Box,
  Button,
  Flex,
  Grid,
  Radio,
  ScrollArea,
  SimpleGrid,
  Table,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  FC,
  Fragment,
  PropsWithChildren,
  useMemo,
  useRef,
  useState,
} from "react";

export const SelectionPage: FC<{
  rows: string[][];
  onNext: (selectedRow: number) => void;
}> = ({ rows, onNext }) => {
  const theme = useMantineTheme();
  const [selectedRow, setSelectedRow] = useState(0);
  const scrollElement = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollElement.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    count: rows[0].length + 1,
    horizontal: true,
    getScrollElement: () => scrollElement.current,
    estimateSize: (index) => (index > 0 ? 100 : 35),
    overscan: 5,
  });

  if (rows.length === 0) {
    return null;
  }

  return (
    <>
      <Box p="lg">
        <Title order={2} mb={"lg"}>
          Select header row
        </Title>
        <Box
          ref={scrollElement}
          style={{
            height: "55vh",
            width: "100%",
            overflow: "auto",
            borderWidth: 1,
            borderColor: theme.colors.gray[2],
            borderStyle: "solid",
            borderRadius: 8,
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: `${columnVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((row) => {
              return (
                <Box
                  key={row.key}
                  onClick={() => setSelectedRow(row.index)}
                  style={{
                    top: row.start,
                    height: `${row.size}px`,
                  }}
                  sx={{
                    position: "absolute",
                    left: 0,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.gray[2],
                    borderBottomStyle: "solid",
                    cursor: "pointer",
                    backgroundColor:
                      row.index === selectedRow
                        ? theme.colors.blue[1]
                        : undefined,
                    "&:hover": {
                      backgroundColor: theme.colors.blue[2],
                    },
                  }}
                >
                  {columnVirtualizer.getVirtualItems().map((column) => {
                    return (
                      <Box
                        key={`${row.index}-${column.index}`}
                        sx={{
                          zIndex: 1,
                          position: "absolute",
                          top: 0,
                          borderBottom: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent:
                            column.index > 0 ? undefined : "center",
                        }}
                        px={column.index > 0 ? "xs" : 0}
                        style={{
                          left: column.start,
                          width: `${column.size}px`,
                          height: `${row.size}px`,
                          lineHeight: `${row.size}px`,
                        }}
                      >
                        {column.index > 0 ? (
                          <div
                            style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {rows[row.index][column.index - 1]}
                          </div>
                        ) : (
                          <Radio
                            checked={row.index === selectedRow}
                            onChange={() => {}}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </div>
        </Box>
      </Box>
      <Box
        p={"lg"}
        bg={"gray.0"}
        sx={{ textAlign: "center", borderRadius: "0px 0px 8px 8px" }}
      >
        <Button size="lg" w={"25%"} onClick={() => onNext(selectedRow)}>
          Next
        </Button>
      </Box>
    </>
  );
};
