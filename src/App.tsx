import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
} from "@refinedev/mantine";

import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { authProvider } from "./provider/authentication";
import { dataProvider } from "./provider/datasource";
import { UserCreate, UserEdit, UserList, UserShow } from "./pages/users";
import {
  StudentCreate,
  StudentEdit,
  StudentList,
  StudentShow,
} from "./pages/students";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          {/* You can change the theme colors here. example: theme={{ ...RefineThemes.Magenta, colorScheme:colorScheme }} */}
          <MantineProvider
            theme={{ ...RefineThemes.Blue, colorScheme: colorScheme }}
            withNormalizeCSS
            withGlobalStyles
          >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
              <Refine
                dataProvider={dataProvider()}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: "students",
                    list: "/students",
                    create: "/student/create",
                    edit: "/student/:id/edit",
                    show: "/student/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "users",
                    list: "/users",
                    create: "/user/create",
                    edit: "/user/:id/edit",
                    show: "/user/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "teuyVR-cAfitN-jzHsGf",
                  disableTelemetry: true,
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 Header={() => <Header sticky />}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    />
                    <Route path="/users">
                      <Route index element={<UserList />} />
                    </Route>
                    <Route path="/user">
                      <Route path="create" element={<UserCreate />} />
                      <Route path=":id/edit" element={<UserEdit />} />
                      <Route path=":id" element={<UserShow />} />
                    </Route>
                    <Route path="/students">
                      <Route index element={<StudentList />} />
                    </Route>
                    <Route path="/student">
                      <Route path="create" element={<StudentCreate />} />
                      <Route path=":id/edit" element={<StudentEdit />} />
                      <Route path=":id" element={<StudentShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
