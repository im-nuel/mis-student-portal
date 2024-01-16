import React from "react";
import { Box, Card, Group, Stack, Title } from "@mantine/core";
import {
  useRefineContext,
  useResource,
  useUserFriendlyName,
  useRouterType,
  useTranslate,
} from "@refinedev/core";

import {
  Breadcrumb,
  CreateButton,
  CreateButtonProps,
  ListProps,
} from "@refinedev/mantine";
import { ListProvider } from "./List/ListProvider";

export const List: React.FC<ListProps> = (props) => {
  const { children, wrapperProps, contentProps } = props;

  return (
    <ListProvider {...props}>
      <Card p="md" {...wrapperProps}>
        <Box pt="sm" {...contentProps}>
          {children}
        </Box>
      </Card>
    </ListProvider>
  );
};
