import { CrudOperators } from "@refinedev/core";

export const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "nin":
    case "ne":
    case "gt":
    case "gte":
    case "lt":
    case "lte":
      return `$${operator}`;
    case "contains":
      return "$like";
    case "eq":
    default:
      return "";
  }
};
