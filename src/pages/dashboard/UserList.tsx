import { ActionIcon, Card, Group, Progress, Text } from "@mantine/core";
import { IconArrowUpRight } from "@tabler/icons-react";
import React from "react";

type UserListProps = {
  label: string;
  icon: React.ReactNode;
};

export const UserList: React.FC<UserListProps> = ({ label, icon }) => {
  return (
    <Card withBorder>
      <Group position="apart">
        <div>
          <Group>
            <Text size={24} weight={"bold"}>
              356,768
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
        </div>
        <div>
          <ActionIcon size={"xl"} color="gray" variant="light">
            {icon}
          </ActionIcon>
        </div>
      </Group>
      <Progress
        mt={"lg"}
        size={24}
        sections={[
          { value: 15, color: "gray", label: "15%" },
          { value: 25, color: "red", label: "25%" },
          { value: 20, color: "blue", label: "20%" },
          { value: 40, color: "yellow", label: "40%" },
        ]}
      />
    </Card>
  );
};
