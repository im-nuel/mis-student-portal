import { IResourceComponentsProps, useShow } from "@refinedev/core";
import React from "react";
import { StudentSchema } from "../../provider/schema/student.schema";
import { DocumentPreview } from "./documentPreview";
import { useParams } from "react-router-dom";

export const StudentShowPrint: React.FC<IResourceComponentsProps> = () => {
  const { id } = useParams();
  const { queryResult } = useShow({ resource: "students", id });
  const { data, isLoading } = queryResult;
  const record = (data?.data || {}) as StudentSchema;
  return (
    <div>
      <DocumentPreview student={record} />
    </div>
  );
};
