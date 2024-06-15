import React from "react";
import { RefineThemes, ThemedLayoutContextProvider } from "@refinedev/mantine";
import { ThemedHeaderV2 as DefaultHeader } from "./header";
import { ThemedSiderV2 as DefaultSider } from "./sider";
import {
  Box,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import type { RefineThemedLayoutV2Props } from "@refinedev/mantine";
import { Global } from "@emotion/react";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";

export const ThemedLayoutV2: React.FC<RefineThemedLayoutV2Props> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  initialSiderCollapsed,
  children,
}) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        // You can change the theme colors here. example: theme={{ ...RefineThemes.Magenta, colorScheme:colorScheme }}
        theme={{ ...RefineThemes.Blue, colorScheme: colorScheme }}
        withNormalizeCSS
        withGlobalStyles
      >
        <NotificationsProvider position="top-right">
          <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
          <ThemedLayoutContextProvider
            initialSiderCollapsed={initialSiderCollapsed}
          >
            <Box sx={{ display: "flex" }}>
              <SiderToRender Title={Title} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <HeaderToRender sticky />
                <Box
                  component="main"
                  sx={(theme) => ({
                    padding: theme.spacing.sm,
                  })}
                >
                  {children}
                </Box>
                {Footer && <Footer />}
              </Box>
              {OffLayoutArea && <OffLayoutArea />}
            </Box>
          </ThemedLayoutContextProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
