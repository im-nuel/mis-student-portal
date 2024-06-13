import React from "react";
import {
  useGetIdentity,
  useActiveAuthProvider,
  pickNotDeprecated,
  useWarnAboutChange,
  useLogout,
  useTranslate,
} from "@refinedev/core";
import { HamburgerMenu } from "./hamburgerMenu";
import {
  Avatar,
  Button,
  Flex,
  Header as MantineHeader,
  Menu,
  Sx,
  Title,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/mantine";
import { IconPower, IconSettings } from "@tabler/icons-react";

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
  sticky,
}) => {
  const theme = useMantineTheme();
  const authProvider = useActiveAuthProvider();

  const t = useTranslate();

  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const { data } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const user = data?.user || null;

  const borderColor =
    theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2];

  let stickyStyles: Sx = {};
  if (pickNotDeprecated(sticky, isSticky)) {
    stickyStyles = {
      position: `sticky`,
      top: 0,
      zIndex: 1,
    };
  }

  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        t(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes."
        )
      );

      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  };

  return (
    <MantineHeader
      zIndex={199}
      height={64}
      py={6}
      px="sm"
      sx={{
        borderBottom: `1px solid ${borderColor}`,
        ...stickyStyles,
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        sx={{
          height: "100%",
        }}
      >
        <HamburgerMenu />
        <div>
          {user?.email && (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton>
                  <Flex align="center" gap="sm">
                    <Title order={6} data-testid="header-user-name">
                      {user?.email}
                    </Title>
                    <Avatar src={user?.avatar} alt={user?.email} radius="xl" />
                  </Flex>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{user.email}</Menu.Label>
                <Menu.Item icon={<IconSettings />}>Setting</Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  icon={<IconPower />}
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </Flex>
    </MantineHeader>
  );
};
