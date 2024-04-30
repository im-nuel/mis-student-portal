import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show } from "../../components/page/Show";
import { Box, Card, Divider, Flex, Group, Title } from "@mantine/core";
import { Text } from "@mantine/core";
import moment from "moment";
import { StudentSchema } from "../../provider/schema/student.schema";
import { cm2px } from "../../provider/utils/convertCM2PX";

export const StudentShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = (data?.data || {}) as StudentSchema;

  return (
    <Show isLoading={isLoading}>
      <Card>
        <Show.Header />
        <Box mt={"md"}>
          <Title order={3}>Student ID {record["id"]}</Title>
          <Flex mb="lg">
            <Box w="75%">
              <Title order={5}>Semester</Title>
              <Text>{record["semester"]}</Text>
              <Title order={5}>School Year</Title>
              <Text>{record["school_year"]}</Text>
            </Box>
            <Box>
              <Title order={5}>Registration Number</Title>
              <Text>{record["registration_number"]}</Text>
              <Title order={5}>NISN</Title>
              <Text>{record["nisn"]}</Text>
            </Box>
          </Flex>
        </Box>
      </Card>
      <Card>
        <Box
          sx={{
            width: cm2px(21),
            height: cm2px(29.7),
            padding: cm2px(1),
          }}
        >
          
        </Box>
      </Card>
      <Box mt="md">
        <Card shadow="sm" withBorder>
          <Title order={4} align="center">
            Student Information
          </Title>
          <Flex mx="-sm">
            <Box w={"75%"}>
              <Text mt="sm" mb={3} size={"xs"}>
                Full Name
              </Text>
              <Text>
                {record.last_name}, {record.first_name} {record.middle_name}
              </Text>
            </Box>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Nickname
              </Text>
              <Text>{record.nickname}</Text>
            </Box>
          </Flex>
          <Flex mx="-xs">
            <Box w={"75%"}>
              <Text mt="sm" mb={3} size={"xs"}>
                Rank In Family
              </Text>
              <Text>{record.rank_in_family}</Text>
            </Box>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Gender
              </Text>
              <Text>{record.gender}</Text>
            </Box>
          </Flex>
          <Flex mx="-xs">
            <Group grow w={"75%"} spacing={0}>
              <Box>
                <Text mt="sm" mb={3} size={"xs"}>
                  Citizenship
                </Text>
                <Text>{record.citizenship}</Text>
              </Box>
              <Box>
                <Text mt="sm" mb={3} size={"xs"}>
                  Place of Birth
                </Text>
                <Text>{record.place_of_birth}</Text>
              </Box>
              <Box>
                <Text mt="sm" mb={3} size={"xs"}>
                  Date of Birth
                </Text>
                <Text>{record.date_of_birth}</Text>
              </Box>
            </Group>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Age
              </Text>
              <Text>
                {new Date().getFullYear() - moment(record.date_of_birth).year()}
              </Text>
            </Box>
          </Flex>
          <Flex mx="-xs">
            <Box w={"75%"}>
              <Box>
                <Text mt="sm" mb={3} size={"xs"}>
                  Address
                </Text>
                <Text>{record.address}</Text>
              </Box>
            </Box>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Phone Number
              </Text>
              <Text>{record.phone_number}</Text>
            </Box>
          </Flex>
          <Flex mx="-xs">
            <Group grow w={"75%"} spacing={0}>
              <Box>
                <Text mt="sm" mb={3} size={"xs"}>
                  Email
                </Text>
                <Text>{record.email}</Text>
              </Box>
              <Box>
                <Text mt="sm" mb={3} size={"xs"}>
                  Previous School
                </Text>
                <Text>{record.previous_school}</Text>
              </Box>
            </Group>
            <Box>
              <Box>
                <Text mt="sm" mb={3} size={"xs"}>
                  Religion
                </Text>
                <Text>{record.religion}</Text>
              </Box>
            </Box>
          </Flex>
          <Flex mx="-xs">
            <Group grow w={"75%"} spacing={0}>
              <Box>
                <Text mt="sm" mb={3} size={"xs"}>
                  Status
                </Text>
                <Text>{record.status}</Text>
              </Box>
              <Box>
                <Text mt="sm" mb={3} size={"xs"}>
                  Academic Status
                </Text>
                <Text>{record.academic_status}</Text>
              </Box>
            </Group>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Family Card Number
              </Text>
              <Text>{record.family_card_number}</Text>
            </Box>
          </Flex>
        </Card>

        <Card shadow="sm" withBorder mt="lg">
          <Title order={4} align="center">
            Program
          </Title>
          <Group mx="-xs" grow spacing={0}>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Grade
              </Text>
              <Text>{record.grade}</Text>
            </Box>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Section
              </Text>
              <Text>{record.section}</Text>
            </Box>
          </Group>
          <Group mx="-xs" grow spacing={0}>
            <Box w="50%">
              <Box>
                <Text mt="sm" mb={3} size={"xs"}>
                  Program
                </Text>
                <Text>{record.program}</Text>
              </Box>
            </Box>
            <Box w="50%">
              {record["program"] === "others" && (
                <Box>
                  <Text mt="sm" mb={3} size={"xs"}>
                    Other Program
                  </Text>
                  <Text>{record.other_program}</Text>
                </Box>
              )}
            </Box>
          </Group>
        </Card>

        <Card shadow="sm" withBorder mt="lg">
          <Title order={4} align="center">
            Facilities
          </Title>
          <Flex mx="-xs">
            <Group grow w={"75%"} spacing={0}>
              <Box w="50%">
                <Box>
                  <Text mt="sm" mb={3} size={"xs"}>
                    Transportation
                  </Text>
                  <Text>{record.transportation}</Text>
                </Box>
              </Box>
              <Box w="50%">
                {record["transportation"] === "school_bus" && (
                  <Box>
                    <Text mt="sm" mb={3} size={"xs"}>
                      Pick up Point
                    </Text>
                    <Text>{record.pick_up_point}</Text>
                  </Box>
                )}
              </Box>
            </Group>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Transportation Policy
              </Text>
              <Text>{record.transportation_policy}</Text>
            </Box>
          </Flex>
          <Flex mx="-xs">
            <Group grow w={"75%"} spacing={0}>
              <Box w="50%">
                <Box>
                  <Text mt="sm" mb={3} size={"xs"}>
                    Residence Hall
                  </Text>
                  <Text>{record.residence_hall}</Text>
                </Box>
              </Box>
              <Box w="50%" />
            </Group>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Residence Hall Policy
              </Text>
              <Text>{record.residence_hall_policy}</Text>
            </Box>
          </Flex>
        </Card>

        <Card shadow="sm" withBorder mt="lg">
          <Title order={4} align="center">
            Parent / Guardian Information
          </Title>
          <Group grow spacing={0}>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Father Name
              </Text>
              <Text>{record.father_name}</Text>
            </Box>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Father Occupation
              </Text>
              <Text>{record.father_occupation}</Text>
            </Box>
          </Group>
          <Group grow spacing={0}>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Father Company
              </Text>
              <Text>{record.father_company}</Text>
            </Box>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Father Address
              </Text>
              <Text>{record.father_address}</Text>
            </Box>
          </Group>
          <Group grow spacing={0}>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Father Phone Number
              </Text>
              <Text>{record.father_phone_number}</Text>
            </Box>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Father Email
              </Text>
              <Text>{record.father_email}</Text>
            </Box>
          </Group>
          <Divider mt="lg" />

          <Group grow spacing={0}>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Mother Name
              </Text>
              <Text>{record.mother_name}</Text>
            </Box>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Mother Occupation
              </Text>
              <Text>{record.mother_occupation}</Text>
            </Box>
          </Group>
          <Group grow spacing={0}>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Mother Company
              </Text>
              <Text>{record.mother_company}</Text>
            </Box>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Mother Address
              </Text>
              <Text>{record.mother_address}</Text>
            </Box>
          </Group>
          <Group grow spacing={0}>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Mother Phone Number
              </Text>
              <Text>{record.mother_phone_number}</Text>
            </Box>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Mother Email
              </Text>
              <Text>{record.mother_email}</Text>
            </Box>
          </Group>

          <Divider mt="lg" />

          <Group grow spacing={0}>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Authorised Guardian Name
              </Text>
              <Text>{record.guardian_name}</Text>
            </Box>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Guardian Relation to Student
              </Text>
              <Text>{record.guardian_relation}</Text>
            </Box>
          </Group>

          <Group grow spacing={0}>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Guardian Address
              </Text>
              <Text>{record.guardian_address}</Text>
            </Box>
            <Box>
              <Text mt="sm" mb={3} size={"xs"}>
                Guardian Phone Number
              </Text>
              <Text>{record.guardian_relation}</Text>
            </Box>
          </Group>
        </Card>

        <Card shadow="sm" withBorder mt="lg">
          <Title order={4} align="center">
            Term of Payment
          </Title>
          <Group grow>
            <Box w="75%">
              <Box>
                <Text mt="sm" mb={3} size={"xs"}>
                  Tuition Fee
                </Text>
                <Text>{record.tuition_fee}</Text>
              </Box>
            </Box>
            <Box w="25%">
              <Box>
                <Text mt="sm" mb={3} size={"xs"}>
                  Finance Policy
                </Text>
                <Text>{record.finance_policy}</Text>
              </Box>
            </Box>
          </Group>
          <Group grow>
            <Box w="75%">
              <Box>
                <Text mt="sm" mb={3} size={"xs"}>
                  Residence Hall Policy
                </Text>
                <Text>{record.residence_hall_policy}</Text>
              </Box>
            </Box>
            <Box w="25%" />
          </Group>
        </Card>
      </Box>
      <Show.Footer />
    </Show>
  );
};
