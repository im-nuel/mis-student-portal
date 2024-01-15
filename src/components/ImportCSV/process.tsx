import { PickFieldProps } from "./Content";

export const processRows = (
  rows: string[][],
  headerIndex: number,
  fields: PickFieldProps[]
): { [key: string]: any }[] => {
  const headers = rows[headerIndex];
  const data = rows.slice(1).map((row) => {
    let obj: { [key: string]: any } = {};
    fields.forEach((field) => {
      const relatedHeader = field.pick;
      obj[field.key] = undefined;
      if (relatedHeader) {
        obj[field.key] = row[headers.indexOf(relatedHeader)];
      }
    });
    // row.forEach((item, index) => {
    //   const relatedHeader = fieldPick.find(
    //     (f) => headers[index] === f.key && f.field !== null
    //   );
    //   if (!relatedHeader?.field) return;
    //   obj[relatedHeader.field] = item;
    // });
    return obj;
  });
  return data;
};
