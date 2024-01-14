export const processRows = (
  rows: string[][],
  headerIndex: number,
  fieldPick: { key: string; field: string | null }[]
): { [key: string]: any }[] => {
  const headers = rows[headerIndex];
  const data = rows.slice(1).map((row) => {
    let obj: { [key: string]: any } = {};
    row.forEach((item, index) => {
      const relatedHeader = fieldPick.find(
        (f) => headers[index] === f.key && f.field !== null
      );
      if (!relatedHeader?.field) return;
      obj[relatedHeader.field] = item;
    });
    return obj;
  });
  return data;
};
