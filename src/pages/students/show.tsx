import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show } from "../../components/page/Show";
import {
  AspectRatio,
  Box,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  Radio,
  Select,
  Switch,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Text } from "@mantine/core";
import moment from "moment";
import { StudentSchema } from "../../provider/schema/student.schema";
import { DocumentPrint } from "./documentPrint";
import { Container } from "@mantine/core";
import { PicturePicker } from "../../components/page/Edit/PicturePicker";
import { STUDENT_IMPORT_SCHEMA } from "./studentImportSchema";
import { Input } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { IDEditor } from "./idEditor";
import { IDPreview } from "./idPreview";

export const StudentShow: React.FC<IResourceComponentsProps> = () => {
  const theme = useMantineTheme();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = (data?.data || {}) as StudentSchema;

  const getLabelFromSchema = (key: keyof StudentSchema) => {
    return STUDENT_IMPORT_SCHEMA[key].fieldType.options.find(
      (i: any) => i.value === record[key]
    )?.label;
  };

  return (
    <Show isLoading={isLoading}>
      <Container>
        <Card>
          <Show.Header
            headerButtons={(props) => {
              return (
                <>
                  {props.defaultButtons}
                  <DocumentPrint record={record} />
                  <IDPreview record={record} />
                </>
              );
            }}
          />
          <Group mt="lg">
            <AspectRatio
              ratio={4 / 6}
              sx={{ maxWidth: 100, width: "100%" }}
              bg={"#f8f9fa"}
            >
              <Image
                src={record.profile_image_url}
                alt={record.id}
                withPlaceholder
              />
            </AspectRatio>
            <div>
              <TextInput
                label="Student ID"
                readOnly
                variant="unstyled"
                defaultValue={record.id}
              />
              <Radio.Group mt="sm" label="Student Status" value={record.status}>
                <Radio label="New" value="new" readOnly />
                <Radio label="Old" value="old" readOnly />
                <Radio label="Transfer" value="transfer" readOnly />
              </Radio.Group>
            </div>
          </Group>
          <Flex mx={"-xs"} mb="lg">
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Semester"
              readOnly
              value={getLabelFromSchema("semester")}
            />
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="School Year"
              readOnly
              value={record.school_year}
            />
            <Box sx={{ flex: 1 }} />
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Registration Number"
              readOnly
              value={record.registration_number}
            />
          </Flex>
        </Card>
        <Box mt="md">
          <Card shadow="sm" withBorder mt="lg">
            <Title order={4} align="center">
              Student Information
            </Title>
            <Flex mx="-sm">
              <Flex w={"75%"}>
                <TextInput
                  mx="sm"
                  size="xs"
                  label="Full Name"
                  placeholder="Last Name"
                  readOnly
                  value={record.last_name}
                />
                <TextInput
                  size="xs"
                  label=" "
                  placeholder="First Name"
                  readOnly
                  value={record.first_name}
                />
                <TextInput
                  mx="sm"
                  size="xs"
                  label=" "
                  placeholder="Middle Name"
                  readOnly
                  value={record.middle_name}
                />
              </Flex>
              <TextInput
                w={"25%"}
                mx="sm"
                size="xs"
                label="Nickname"
                placeholder="Nickname"
                readOnly
                value={record.nickname}
              />
            </Flex>
            <Flex mx="-xs">
              <Flex w={"75%"}>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Rank In Family"
                  readOnly
                  value={record.rank_in_family}
                />
                <Box sx={{ flex: 1 }} />
              </Flex>

              <Radio.Group
                w={"25%"}
                mt="sm"
                mx="xs"
                size="xs"
                label="Gender"
                value={record.gender}
              >
                <Radio label="Male" value="male" readOnly />
                <Radio label="Female" value="female" readOnly />
              </Radio.Group>
            </Flex>
            <Flex mx="-xs">
              <Group grow w={"75%"} spacing={0}>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Citizenship"
                  readOnly
                  value={record.citizenship}
                />
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Place Of Birth"
                  readOnly
                  value={record.place_of_birth}
                />
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Date Of Birth"
                  readOnly
                  value={moment(record.date_of_birth).format("MMMM DD, YYYY")}
                />
              </Group>
              <TextInput
                w={"25%"}
                mt="sm"
                mx="xs"
                size="xs"
                label="Age"
                variant="unstyled"
                readOnly
                value={
                  new Date().getFullYear() -
                  moment(record["date_of_birth"]).year()
                }
              />
            </Flex>
            <Flex mx="-xs">
              <Flex w={"75%"}>
                <Textarea
                  mt="sm"
                  mx="xs"
                  size="xs"
                  autosize
                  w={"100%"}
                  label="Address"
                  readOnly
                  value={record.address}
                />
              </Flex>
              <TextInput
                w={"25%"}
                mt="sm"
                mx="xs"
                size="xs"
                label="Phone Number"
                readOnly
                value={record.phone_number}
              />
            </Flex>
            <Flex mx="-xs">
              <Group grow w={"75%"} spacing={0}>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Email"
                  readOnly
                  value={record.email}
                />
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Previous School"
                  readOnly
                  value={record.previous_school}
                />
              </Group>
              <TextInput
                w={"25%"}
                mt="sm"
                mx="xs"
                size="xs"
                readOnly
                label="Religion"
                value={getLabelFromSchema("religion")}
              />
            </Flex>
            <Flex mx="-xs">
              <Group grow w={"75%"} spacing={0}>
                <TextInput
                  label="Student Status"
                  mt="sm"
                  mx="xs"
                  size="xs"
                  readOnly
                  variant="unstyled"
                  value={getLabelFromSchema("status")}
                />
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  readOnly
                  label="Academic Status"
                  value={record.academic_status}
                />
              </Group>
              <TextInput
                w={"25%"}
                mt="sm"
                mx="xs"
                size="xs"
                readOnly
                label="Family Card Number"
                value={record.family_card_number}
              />
            </Flex>
          </Card>

          <Card shadow="sm" withBorder mt="lg">
            <Title order={4} align="center">
              Program
            </Title>
            <Group mx="-xs" grow spacing={0}>
              <TextInput
                mt="sm"
                mx="xs"
                size="xs"
                label="Section"
                readOnly
                value={getLabelFromSchema("section")}
              />
              <TextInput
                mt="sm"
                mx="xs"
                size="xs"
                label="Grade"
                readOnly
                value={getLabelFromSchema("grade")}
              />
            </Group>
            <Group mx="-xs" grow spacing={0}>
              <Box w="50%">
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  readOnly
                  label="Program"
                  value={record["program"]}
                />
              </Box>
              <Box w="50%">
                {record["program"] === "others" && (
                  <TextInput
                    mt="sm"
                    mx="xs"
                    size="xs"
                    readOnly
                    label="Other Program"
                    value={record["other_program"]}
                  />
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
                  <TextInput
                    mt="sm"
                    mx="xs"
                    size="xs"
                    readOnly
                    label="Transportation"
                    value={getLabelFromSchema("transportation")}
                  />
                </Box>
                <Box w="50%">
                  {record["transportation"] === "school_bus" && (
                    <TextInput
                      mt="sm"
                      mx="xs"
                      size="xs"
                      label="Pick Up Point"
                      readOnly
                      value={record["pick_up_point"]}
                    />
                  )}
                </Box>
              </Group>
              <Box mt="sm">
                <Input.Label size="xs" mb="xs">
                  Transportation Policy
                </Input.Label>
                <Switch
                  label={"Signed"}
                  size="sm"
                  readOnly
                  thumbIcon={
                    record["transportation_policy"] ? (
                      <IconCheck
                        size={12}
                        color={theme.colors.teal[theme.fn.primaryShade()]}
                        stroke={3}
                      />
                    ) : (
                      <IconX
                        size={12}
                        color={theme.colors.red[theme.fn.primaryShade()]}
                        stroke={3}
                      />
                    )
                  }
                  checked={record["transportation_policy"]}
                />
              </Box>
            </Flex>
            <Flex mx="-xs">
              <Group grow w={"75%"} spacing={0}>
                <Box w="50%">
                  <TextInput
                    mt="sm"
                    mx="xs"
                    size="xs"
                    readOnly
                    label="Residence Hall"
                    value={getLabelFromSchema("residence_hall")}
                  />
                </Box>
                <Box w="50%" />
              </Group>
              <Box mt="sm">
                <Input.Label size="xs" mb="xs">
                  Residence Hall Policy
                </Input.Label>
                <Switch
                  label={"Signed"}
                  size="sm"
                  thumbIcon={
                    record["residence_hall_policy"] ? (
                      <IconCheck
                        size={12}
                        color={theme.colors.teal[theme.fn.primaryShade()]}
                        stroke={3}
                      />
                    ) : (
                      <IconX
                        size={12}
                        color={theme.colors.red[theme.fn.primaryShade()]}
                        stroke={3}
                      />
                    )
                  }
                  checked={record["residence_hall_policy"]}
                />
              </Box>
            </Flex>
          </Card>

          <Card shadow="sm" withBorder mt="lg">
            <Title order={4} align="center">
              Parent / Guardian Information
            </Title>
            <Group grow spacing={0}>
              <Box>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  readOnly
                  label="Father Name"
                  value={record["father_name"]}
                />
              </Box>
              <Box>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  readOnly
                  label="Father Occupation"
                  value={record["father_occupation"]}
                />
              </Box>
            </Group>
            <Group grow spacing={0}>
              <Box>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Father Company"
                  readOnly
                  value={record["father_company"]}
                />
              </Box>
              <Box>
                <Textarea
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Father Address"
                  readOnly
                  value={record["father_address"]}
                />
              </Box>
            </Group>
            <Group grow spacing={0}>
              <Box>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Father Phone Number"
                  readOnly
                  value={record["father_phone_number"]}
                />
              </Box>
              <Box>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Father Email"
                  readOnly
                  value={record["father_email"]}
                />
              </Box>
            </Group>
            <Divider mt="lg" />
            <Group grow spacing={0}>
              <Box>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Mother Name"
                  readOnly
                  value={record["mother_name"]}
                />
              </Box>
              <Box>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Mother Occupation"
                  readOnly
                  value={record["mother_occupation"]}
                />
              </Box>
            </Group>
            <Group grow spacing={0}>
              <Box>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Mother Company"
                  readOnly
                  value={record["mother_company"]}
                />
              </Box>
              <Box>
                <Textarea
                  autosize
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Mother Address"
                  readOnly
                  value={record["mother_address"]}
                />
              </Box>
            </Group>
            <Divider mt="lg" />
            <Group grow spacing={0}>
              <Box>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Authorized Guardian Name"
                  readOnly
                  value={record["guardian_name"]}
                />
              </Box>
              <Box>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Guardian Relation to Student"
                  readOnly
                  value={record["guardian_relation"]}
                />
              </Box>
            </Group>
            <Group grow spacing={0}>
              <Box>
                <Textarea
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Guardian Address"
                  readOnly
                  value={record["guardian_address"]}
                />
              </Box>
              <Box>
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Guardian Phone Number"
                  readOnly
                  value={record["guardian_phone_number"]}
                />
              </Box>
            </Group>
          </Card>

          <Card shadow="sm" withBorder mt="lg">
            <Title order={4} align="center">
              Term of Payment
            </Title>
            <Group grow>
              <Box w="75%">
                <TextInput
                  mt="sm"
                  size="xs"
                  label="A. Tuition Fee"
                  readOnly
                  value={getLabelFromSchema("tuition_fee")}
                />
              </Box>
              <Box w="25%">
                <Box mt="sm">
                  <Input.Label size="xs" mb="xs">
                    Finance Policy
                  </Input.Label>
                  <Switch
                    label={"Signed"}
                    size="sm"
                    thumbIcon={
                      record["finance_policy"] ? (
                        <IconCheck
                          size={12}
                          color={theme.colors.teal[theme.fn.primaryShade()]}
                          stroke={3}
                        />
                      ) : (
                        <IconX
                          size={12}
                          color={theme.colors.red[theme.fn.primaryShade()]}
                          stroke={3}
                        />
                      )
                    }
                    checked={record["finance_policy"]}
                  />
                </Box>
              </Box>
            </Group>
            <Group grow>
              <Box w="75%">
                <TextInput
                  mt="sm"
                  size="xs"
                  label="B. Residence Hall"
                  readOnly
                  value={getLabelFromSchema("residence_hall_payment")}
                />
              </Box>
              <Box w="25%" />
            </Group>
          </Card>
        </Box>
        <Show.Footer />
      </Container>
    </Show>
  );
};
