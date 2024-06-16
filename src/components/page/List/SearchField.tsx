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
    filters: filterValue
      ? [
          {
            operator: "or",
            value: filters.map((filter) => {
              return {
                field: filter,
                operator: "contains",
                value: `%${filterValue}%`,
              };
            }),
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
              {capitalizeString(
                `${!!data.last_name ? data.last_name + ", " : ""}${
                  data.first_name
                }${data.middle_name ? ` ${data.middle_name}` : ""}`
              )}
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
