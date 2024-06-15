import { Container, Grid, Group, Text, Title } from "@mantine/core";
import { Card } from "@mantine/core";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import { StatsCard } from "./StatsCard";
import { IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { StatsSegment } from "./StatsSegment";
import { DashboardContextConsumer, DashboardContextProvider } from "./context";
import { UserList } from "./UserList";
import { Box } from "@mantine/core";

export const DashboardPage: React.FC<IResourceComponentsProps> = () => {
  return (
    <DashboardContextProvider>
      <Container size={"md"}>
        <Grid>
          <Grid.Col span={12}>
            <StatsSegment label="Total Student" icon={<IconUsersGroup />} />
          </Grid.Col>
          {[
            {
              title: "Early Childhood Program",
              key: "ecp",
              color: "gray",
            },
            {
              title: "Early Childhood Program",
              key: "es",
              color: "red",
            },
            {
              title: "Early Childhood Program",
              key: "ms",
              color: "blue",
            },
            {
              title: "Early Childhood Program",
              key: "hs",
              color: "yellow",
            },
          ].map(({ title, key, color }) => (
            <Grid.Col span={3}>
              <DashboardContextConsumer>
                {({ section }) => (
                  <StatsCard
                    value={section[key as "ecp" | "es" | "ms" | "hs"].total}
                    color={color}
                    label="Students"
                    title={title}
                    icon={<IconUsersGroup />}
                  />
                )}
              </DashboardContextConsumer>
            </Grid.Col>
          ))}
          <Grid.Col span={12}>
            <Card withBorder>
              <UserList />
            </Card>
          </Grid.Col>
        </Grid>

        <Box h={"25vh"} />
      </Container>
    </DashboardContextProvider>
  );
};
