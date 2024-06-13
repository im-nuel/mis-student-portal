import { Refine } from "@refinedev/core";
import { authProvider } from "./provider/authentication";
import { dataProvider } from "./provider/datasource";
import { Route, Routes } from "react-router-dom";
import { StudentShowPrint } from "./pages/students/show_print";

export const HeadlessRoutes = () => {
  return (
    <Refine dataProvider={dataProvider()} authProvider={authProvider}>
      <Routes>
        <Route path="/student/:id/print">
          <Route index element={<StudentShowPrint />} />
        </Route>
      </Routes>
    </Refine>
  );
};
