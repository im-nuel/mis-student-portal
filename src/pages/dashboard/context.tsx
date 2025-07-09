import { GetListResponse, useList } from "@refinedev/core";
import React from "react";
import { StudentSchema } from "../../provider/schema/student.schema";
import { getActiveSchoolYear } from "../../components/utils/getActiveSchoolYear";

type DashboardContextValue = {
  section: {
    all: GetListResponse<StudentSchema>;
    latest: GetListResponse<StudentSchema>;
    ecp: GetListResponse<StudentSchema>;
    es: GetListResponse<StudentSchema>;
    ms: GetListResponse<StudentSchema>;
    hs: GetListResponse<StudentSchema>;
  };
};

const DashboardContext = React.createContext<DashboardContextValue>({} as any);

export const DashboardContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data: totalData } = useList<StudentSchema>({
    resource: "students",
    pagination: {
      pageSize: 0,
    },
    filters: [
      {
        field: "school_year",
        operator: "eq",
        value: getActiveSchoolYear(),
      },
    ],
  });
  
  const { data: latestData } = useList<StudentSchema>({
    resource: "students",
    pagination: { pageSize: 10 },
    sorters: [{ field: "id", order: "desc" }],
    filters: [
      { field: "school_year", operator: "eq", value: getActiveSchoolYear() },
    ],
  });

  const { data: ecpData } = useList<StudentSchema>({
    resource: "students",
    pagination: {
      pageSize: 0,
    },
    filters: [
      { field: "school_year", operator: "eq", value: getActiveSchoolYear() },
      {
        field: "section",
        operator: "eq",
        value: "ECP",
      },
    ],
  });

  const { data: esData } = useList<StudentSchema>({
    resource: "students",
    pagination: {
      pageSize: 0,
    },

    filters: [
      { field: "school_year", operator: "eq", value: getActiveSchoolYear() },
      {
        field: "section",
        operator: "eq",
        value: "ES",
      },
    ],
  });
  const { data: msData } = useList<StudentSchema>({
    resource: "students",
    pagination: {
      pageSize: 0,
    },
    filters: [
      { field: "school_year", operator: "eq", value: getActiveSchoolYear() },
      {
        field: "section",
        operator: "eq",
        value: "MS",
      },
    ],
  });
  const { data: hsData } = useList<StudentSchema>({
    resource: "students",
    pagination: {
      pageSize: 0,
    },
    filters: [
      { field: "school_year", operator: "eq", value: getActiveSchoolYear() },
      {
        field: "section",
        operator: "eq",
        value: "HS",
      },
    ],
  });

  return (
    <DashboardContext.Provider
      value={{
        section: {
          all: {
            data: totalData?.data || [],
            total: totalData?.total || 0,
          },
          latest: {
            data: latestData?.data || [],
            total: latestData?.total || 0,
          },
          ecp: {
            data: ecpData?.data || [],
            total: ecpData?.total || 0,
          },
          es: {
            data: esData?.data || [],
            total: esData?.total || 0,
          },
          ms: {
            data: msData?.data || [],
            total: msData?.total || 0,
          },
          hs: {
            data: hsData?.data || [],
            total: hsData?.total || 0,
          },
        },
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const DashboardContextConsumer = DashboardContext.Consumer;

export const useDashboardContext = () => {
  return React.useContext(DashboardContext);
};
