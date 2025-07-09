import { ActionIcon, Card, Group, Progress, Text } from "@mantine/core";
import { useList } from "@refinedev/core";
import { IconArrowUpRight } from "@tabler/icons-react";
import React from "react";
import { useDashboardContext } from "./context";
import { getActiveSchoolYear } from "../../components/utils/getActiveSchoolYear";

type StatsSegmentProps = {
  label: string;
  icon: React.ReactNode;
};

export const StatsSegment: React.FC<StatsSegmentProps> = ({ label, icon }) => {
  const { section } = useDashboardContext();

  return (
    <Card withBorder>
      <Group position="apart">
        <div>
          <Group>
            <Text lh={1} size={24} weight={"bold"}>
              {section.all.total}
            </Text>
            <Text
              lh={1}
              c="green"
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
          <Text color="gray">
            Active students this school year ({getActiveSchoolYear()})
          </Text>
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
          {
            key: "ecp",
            color: "gray",
          },
          {
            key: "es",
            color: "red",
          },
          {
            key: "ms",
            color: "blue",
          },
          {
            key: "hs",
            color: "yellow",
          },
        ].map(({ key, color }) => {
          const v = section[key as "ecp"].total;
          return {
            label: `${v}`,
            color,
            value: calculatePercentage(section.all.total, v),
          };
        })}
      />
    </Card>
  );
};

const calculatePercentage = (total: number, value: number): number => {
  return (value / total) * 100;
};
