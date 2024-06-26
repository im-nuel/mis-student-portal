import { ActionIcon, Flex, Group, MantineColor, Text } from "@mantine/core";
import { Card } from "@mantine/core";
import { CrudFilter, useList } from "@refinedev/core";
import {
  IconArrowUpRight,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import React from "react";

type StatsCardProps = {
  label: string;
  title: string;
  icon: React.ReactNode;
  color: MantineColor;
  value: string | number;
};

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  title,
  icon,
  color,
  value,
}) => {
  return (
    <Card color="blue" withBorder>
      <Flex>
        <Text
          title={title}
          size={"sm"}
          weight={"bold"}
          c={"gray"}
          truncate
          style={{
            flexGrow: 1,
          }}
        >
          {title}
        </Text>
        <ActionIcon color={color} variant="light">
          {icon}
        </ActionIcon>
      </Flex>
      <Group align="flex-end" mt="lg" spacing={"xs"}>
        <Text weight={"bold"} size={24} lh={1}>
          {value}
        </Text>
        <Text
          color="green"
          size={14}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>{35}%</span>
          <IconArrowUpRight size={16} />
        </Text>
      </Group>
      <Text>{label}</Text>
      <Text fz={"xs"} c={"gray"}>
        Compared to previous school year
      </Text>
    </Card>
  );
};
