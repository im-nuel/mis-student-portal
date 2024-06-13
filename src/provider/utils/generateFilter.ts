import { CrudFilters, LogicalFilter } from "@refinedev/core";
import { mapOperator } from "./mapOperator";

// type LogicalFilter =
//   | string
//   | { $in: (string | number)[] }
//   | { $nin: (string | number)[] }
//   | { $lt: string | number }
//   | { $gt: string | number }
//   | { $lte: string | number }
//   | { $gte: string | number };

// type ConditionalFilter = { $or: QueryFilter[] } | { $and: QueryFilter[] };

// type QueryFilter = LogicalFilter | ConditionalFilter;

export const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: any = {};

  if (filters) {
    filters.forEach((filter) => {
      if (filter.operator === "or" || filter.operator === "and") {
        // Handle your logical filters here
        // console.log(typeof filter); // LogicalFilter
        queryFilters["$or"] = filter.value.map((f) => {
          const { field, operator, value } = f as LogicalFilter;
          const mappedOperator = mapOperator(operator);
          return {
            [field]: {
              [mappedOperator]: value,
            },
          };
        });
        return;
      }

      // Handle your conditional filters here
      // console.log(typeof filter); // ConditionalFilter

      if ("field" in filter) {
        const { field, operator, value } = filter;

        if (field === "q") {
          queryFilters[field] = value;
          return;
        }

        const mappedOperator = mapOperator(operator);
        if (mappedOperator === "") {
          queryFilters[field as string] = value;
        } else {
          queryFilters[field as string] = {
            ...(queryFilters as any)[field as string],
            [mappedOperator]: value,
          };
        }
      }
    });
  }

  return queryFilters;
};
