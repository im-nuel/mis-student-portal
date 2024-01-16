import { IResourceComponentsProps } from "@refinedev/core";
import { Create, Edit, useForm } from "@refinedev/mantine";
import {
  Select,
  TextInput,
  Box,
  Radio,
  Flex,
  Text,
  Group,
  Divider,
  Title,
  Card,
  Textarea,
} from "@mantine/core";
import { STUDENT_IMPORT_SCHEMA } from "./studentImportSchema";
import { DatePicker } from "@mantine/dates";
import moment from "moment";

export const StudentEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { formLoading },
    values,
  } = useForm({
    initialValues: {
      academic_status: "",
      account_status: "",
      address: "",
      age: "",
      asother: "",
      citizenship: "",
      created_at: "",
      date_of_birth: new Date(),
      document_approval: "",
      email: "",
      family_card_number: "",
      father_address: "",
      father_company: "",
      father_email: "",
      father_name: "",
      father_occupation: "",
      father_phone_number: "",
      finance_policy: "",
      first_name: "",
      gender: "male",
      grade: "",
      guardian_address: "",
      guardian_name: "",
      guardian_phone_number: "",
      guardian_relation: "",
      last_name: "",
      middle_name: "",
      mother_address: "",
      mother_company: "",
      mother_email: "",
      mother_name: "",
      mother_occupation: "",
      mother_phone_number: "",
      nickname: "",
      nisn: "",
      other_program: "",
      phone_number: "",
      pick_up_point: "",
      place_of_birth: "",
      previous_school: "",
      program: "",
      rank_in_family: "",
      register_date: "",
      registration_number: "",
      religion: "",
      residence_hall_payment: "",
      residence_hall_policy: "",
      residence_hall: "",
      school_year: "",
      section: "",
      semester: "",
      status: "new",
      student_id: "",
      test_approval: "",
      transportation_policy: "",
      transportation: "",
      tuition_fee: "",
      updated_at: "",
    },
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Group>
        <Radio.Group label="Student" {...getInputProps("status")}>
          <Radio label="New" value="new" />
          <Radio label="Old" value="old" />
          <Radio label="Transfer" value="transfer" />
        </Radio.Group>
      </Group>
      <Flex mx={"-xs"} mb="lg">
        <Select
          mt="sm"
          mx="xs"
          size="xs"
          label="Semester"
          data={STUDENT_IMPORT_SCHEMA["semester"].fieldType.options}
          {...getInputProps("semester")}
        />
        <Select
          mt="sm"
          mx="xs"
          size="xs"
          withinPortal
          label="School Year"
          data={STUDENT_IMPORT_SCHEMA["school_year"].fieldType.options}
          {...getInputProps("school_year")}
        />
        <TextInput
          mt="sm"
          mx="xs"
          size="xs"
          label="Student ID"
          {...getInputProps("student_id")}
        />
        <Box sx={{ flex: 1 }} />
        <TextInput
          mt="sm"
          mx="xs"
          size="xs"
          label="Registration Number"
          {...getInputProps("registration_number")}
        />
      </Flex>
      <Card shadow="sm" withBorder>
        <Title order={4} align="center">
          Student Information
        </Title>
        <Text mt="sm" mb={3} size={"xs"}>
          Full Name
        </Text>
        <Flex mx="-sm">
          <Flex w={"75%"}>
            <TextInput
              mx="sm"
              size="xs"
              placeholder="Last Name"
              {...getInputProps("last_name")}
            />
            <TextInput
              size="xs"
              placeholder="First Name"
              {...getInputProps("first_name")}
            />
            <TextInput
              mx="sm"
              size="xs"
              placeholder="Middle Name"
              {...getInputProps("middle_name")}
            />
          </Flex>
          <TextInput
            w={"25%"}
            mx="sm"
            size="xs"
            placeholder="Nickname"
            {...getInputProps("nickname")}
          />
        </Flex>
        <Flex mx="-xs">
          <Flex w={"75%"}>
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Rank In Family"
              {...getInputProps("rank_in_family")}
            />
            <Box sx={{ flex: 1 }} />
          </Flex>

          <Radio.Group
            w={"25%"}
            mt="sm"
            mx="xs"
            size="xs"
            label="Gender"
            {...getInputProps("gender")}
          >
            <Radio label="Male" value="male" />
            <Radio label="Female" value="female" />
          </Radio.Group>
        </Flex>
        <Flex mx="-xs">
          <Group grow w={"75%"} spacing={0}>
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Citizenship"
              {...getInputProps("citizenship")}
            />
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Place Of Birth"
              {...getInputProps("place_of_birth")}
            />
            <DatePicker
              mt="sm"
              mx="xs"
              size="xs"
              withinPortal
              label="Date Of Birth"
              {...getInputProps("date_of_birth")}
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
            {...getInputProps("age")}
            value={
              new Date().getFullYear() - moment(values["date_of_birth"]).year()
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
              {...getInputProps("address")}
            />
          </Flex>
          <TextInput
            w={"25%"}
            mt="sm"
            mx="xs"
            size="xs"
            label="Phone Number"
            {...getInputProps("phone_number")}
          />
        </Flex>
        <Flex mx="-xs">
          <Group grow w={"75%"} spacing={0}>
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Email"
              {...getInputProps("email")}
            />
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Previous School"
              {...getInputProps("previous_school")}
            />
          </Group>
          <Select
            w={"25%"}
            mt="sm"
            mx="xs"
            size="xs"
            withinPortal
            label="Religion"
            data={STUDENT_IMPORT_SCHEMA["religion"].fieldType.options}
            {...getInputProps("religion")}
          />
        </Flex>
        <Flex mx="-xs">
          <Group grow w={"75%"} spacing={0}>
            <Select
              mt="sm"
              mx="xs"
              size="xs"
              withinPortal
              label="Status"
              data={STUDENT_IMPORT_SCHEMA["status"].fieldType.options}
              {...getInputProps("status")}
            />
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Academic Status"
              {...getInputProps("academic_status")}
            />
          </Group>
          <TextInput
            w={"25%"}
            mt="sm"
            mx="xs"
            size="xs"
            label="Family Card Number"
            {...getInputProps("family_card_number")}
          />
        </Flex>
      </Card>

      <Card shadow="sm" withBorder mt="lg">
        <Title order={4} align="center">
          Program
        </Title>
        <Group mx="-xs" grow spacing={0}>
          <Select
            mt="sm"
            mx="xs"
            size="xs"
            withinPortal
            label="Section"
            {...getInputProps("section")}
            data={STUDENT_IMPORT_SCHEMA["section"].fieldType.options}
          />
          <Select
            mt="sm"
            mx="xs"
            size="xs"
            withinPortal
            label="Grade"
            {...getInputProps("grade")}
            data={STUDENT_IMPORT_SCHEMA["grade"].fieldType.options}
          />
        </Group>
        <Group mx="-xs" grow spacing={0}>
          <Box w="50%">
            <Select
              mt="sm"
              mx="xs"
              size="xs"
              withinPortal
              label="Program"
              {...getInputProps("program")}
              data={[
                {
                  label: "National",
                  value: "national",
                },
                {
                  label: "A Beka",
                  value: "abeka",
                },
                {
                  label: "Cambridge",
                  value: "cambridge",
                },
                {
                  label: "Others",
                  value: "others",
                },
              ]}
            />
          </Box>
          <Box w="50%">
            {values["program"] === "others" && (
              <TextInput
                mt="sm"
                mx="xs"
                size="xs"
                label="Other Program"
                {...getInputProps("other_program")}
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
              <Select
                mt="sm"
                mx="xs"
                size="xs"
                withinPortal
                label="Transportation"
                data={STUDENT_IMPORT_SCHEMA["transportation"].fieldType.options}
                {...getInputProps("transportation")}
              />
            </Box>
            <Box w="50%">
              {values["transportation"] === "school_bus" && (
                <TextInput
                  mt="sm"
                  mx="xs"
                  size="xs"
                  label="Pick Up Point"
                  {...getInputProps("pick_up_point")}
                />
              )}
            </Box>
          </Group>
          <Radio.Group
            mt="sm"
            label="Transportation Policy"
            size="xs"
            {...getInputProps("transportation_policy")}
          >
            <Radio label="Signed" value="signed" />
            <Radio label="Not Signed" value="not_signed" />
          </Radio.Group>
        </Flex>
        <Flex mx="-xs">
          <Group grow w={"75%"} spacing={0}>
            <Box w="50%">
              <Select
                mt="sm"
                mx="xs"
                size="xs"
                withinPortal
                data={STUDENT_IMPORT_SCHEMA["residence_hall"].fieldType.options}
                label="Residence Hall"
                {...getInputProps("residence_hall")}
              />
            </Box>
            <Box w="50%" />
          </Group>
          <Radio.Group
            mt="sm"
            size="xs"
            label="Residence Hall Policy"
            {...getInputProps("residence_hall_policy")}
          >
            <Radio label="Signed" value="true" />
            <Radio label="Not Signed" value="false" />
          </Radio.Group>
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
              label="Father Name"
              {...getInputProps("father_name")}
            />
          </Box>
          <Box>
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Father Occupation"
              {...getInputProps("father_occupation")}
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
              {...getInputProps("father_company")}
            />
          </Box>
          <Box>
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Father Address"
              {...getInputProps("father_address")}
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
              {...getInputProps("father_phone_number")}
            />
          </Box>
          <Box>
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Father Email"
              {...getInputProps("father_email")}
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
              {...getInputProps("mother_name")}
            />
          </Box>
          <Box>
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Mother Occupation"
              {...getInputProps("mother_occupation")}
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
              {...getInputProps("mother_company")}
            />
          </Box>
          <Box>
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Mother Address"
              {...getInputProps("mother_address")}
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
              {...getInputProps("guardian_name")}
            />
          </Box>
          <Box>
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Guardian Relation to Student"
              {...getInputProps("guardian_relation")}
            />
          </Box>
        </Group>
        <Group grow spacing={0}>
          <Box>
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Guardian Address"
              {...getInputProps("mother_company")}
            />
          </Box>
          <Box>
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Guardian Phone Number"
              {...getInputProps("guardian_phone_number")}
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
            <Select
              mt="sm"
              size="xs"
              label="A. Tuition Fee"
              {...getInputProps("tuition_fee")}
              data={STUDENT_IMPORT_SCHEMA["tuition_fee"].fieldType.options}
            />
          </Box>
          <Box w="25%">
            <Radio.Group
              mt="sm"
              size="xs"
              label="Finance Policy"
              {...getInputProps("finance_policy")}
            >
              <Radio label="Signed" value="true" />
              <Radio label="Not Signed" value="false" />
            </Radio.Group>
          </Box>
        </Group>
        <Group grow>
          <Box w="75%">
            <Select
              mt="sm"
              size="xs"
              label="B. Residence Hall"
              {...getInputProps("residence_hall_payment")}
              data={
                STUDENT_IMPORT_SCHEMA["residence_hall_payment"].fieldType
                  .options
              }
            />
          </Box>
          <Box w="25%" />
        </Group>
      </Card>
      {/* <TextInput mt="sm" label="Nisn" {...getInputProps("nisn")} /> */}
      {/* <TextInput mt="sm" label="Asother" {...getInputProps("asother")} /> */}
    </Edit>
  );
};
