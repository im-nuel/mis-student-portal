import { Container, Grid, Group, Text, Title } from "@mantine/core";
import { Card } from "@mantine/core";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import { StatsCard } from "./StatsCard";
import { IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { StatsSegment } from "./StatsSegment";

export const DashboardPage: React.FC<IResourceComponentsProps> = () => {
  return (
    <Container size={"md"}>
      <Grid>
        <Grid.Col span={12}>
          <StatsSegment label="Total Student" icon={<IconUsersGroup />} />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatsCard
            color="gray"
            label="Students"
            resource="students"
            title="Early Childhood Program"
            icon={<IconUsersGroup />}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatsCard
            color="red"
            label="Students"
            resource="students"
            title="Elementary School"
            icon={<IconUsersGroup />}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatsCard
            color="blue"
            label="Students"
            resource="students"
            title="Middle School"
            icon={<IconUsersGroup />}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatsCard
            color="yellow"
            label="Students"
            resource="students"
            title="High School"
            icon={<IconUsersGroup />}
          />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={12}>
          <Card>
            <Text>Latest Students</Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
