import {
  Autocomplete,
  AutocompleteItem,
  Box,
  Flex,
  Group,
  Loader,
} from "@mantine/core";
import { useList } from "@refinedev/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";
import { StudentSchema } from "../../../provider/schema/student.schema";
import { useDebouncedValue } from "@mantine/hooks";
import { capitalizeString } from "../../utils/capitalized";
import { normalizeText } from "../../utils/normalizeText";
import { Highlight } from "@mantine/core";
import _isEmpty from "lodash/isEmpty";

export const SearchField: React.FC<{
  resource: string;
  filters: string[];

  placeholder?: string;
  onItemSubmit: (
    item: AutocompleteItem & {
      data: StudentSchema;
    }
  ) => void;
}> = ({
  resource,
  filters,
  placeholder = "Search something",
  onItemSubmit,
}) => {
  const [value, setValue] = React.useState<string>("");
  const [filterValue] = useDebouncedValue(value, 1000);
  const { data, isLoading, isFetching, isError } = useList<StudentSchema>({
    resource,
    pagination: {
      pageSize: 20,
    },
    sorters: [
      {
        field: "id",
        order: "desc",
      },
    ],
    filters: filterValue
      ? [
          {
            field: "q",
            operator: "eq",
            value: filterValue,
          },
          {
            field: "qf",
            operator: "eq",
            value: filters.join(","),
          },
        ]
      : [],
  });

  const options = React.useMemo(() => {
    return (
      data?.data.map((d) => ({
        value: `${d.id} ${d.last_name}, ${d.first_name} ${d.middle_name}`,
        label: d.id,
        data: d,
      })) || []
    );
  }, [data]);

  return (
    <Autocomplete
      w="100%"
      withinPortal
      placeholder={placeholder}
      limit={20}
      filter={() => true}
      icon={
        isLoading || isFetching || value !== filterValue ? (
          <Loader size={16} />
        ) : (
          <IconSearch size={16} />
        )
      }
      itemComponent={React.forwardRef(({ label, data, ...others }, ref) => (
        <div {...others}>
          <Flex mx="sm">
            <Box mr="sm">{data.id}</Box>
            <Box>
              <Highlight
                highlight={normalizeText(filterValue)}
                highlightColor=""
                highlightStyles={{
                  fontWeight: "bold",
                }}
              >
                {capitalizeString(
                  `${!_isEmpty(data.last_name) ? data.last_name + ", " : ""}${
                    data.first_name
                  }${data.middle_name ? ` ${data.middle_name}` : ""}`
                )}
              </Highlight>
            </Box>
          </Flex>
        </div>
      ))}
      data={options}
      onChange={(value) => {
        setValue(value);
      }}
      onItemSubmit={(v) => {
        onItemSubmit(v as any);
      }}
    />
  );
};
