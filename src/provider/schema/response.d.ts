export interface ResponseList<IRecords> {
  data: IRecords[];
  limit: number;
  skip: number;
  total: number;
}
