import React from "react";
import moment from "moment";
import { IResourceComponentsProps } from "@refinedev/core";
import { useForm } from "@refinedev/mantine";
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
  AspectRatio,
  Switch,
  useMantineTheme,
  Input,
  Container,
} from "@mantine/core";
import { STUDENT_IMPORT_SCHEMA } from "./studentImportSchema";
import { DatePicker } from "@mantine/dates";
import { PicturePicker } from "../../components/page/Edit/PicturePicker";
import { imagekit } from "../../provider/imagekit";
import { ImageProps } from "../../components/image_picker/ImagePickerProvider";
import { generateId } from "../../components/utils/generateId";
import { blobUrlToBase64 } from "../../components/utils/blobUrlToBase64";
import { IconCheck, IconX } from "@tabler/icons-react";
import * as Yup from "yup";
import { yupResolver } from "@mantine/form";
import _reverse from "lodash/reverse";
import { Edit } from "../../components/page/Edit";
import { EditHeader } from "../../components/page/Edit/EditHeader";
import { EditFooter } from "../../components/page/Edit/EditFooter";
import { DeveloperInspect } from "../../components/dev_inspect";
import { SECTIONING } from "./create";
import { StudentSchema } from "../../provider/schema/student.schema";

const SCHEMA = Yup.object().shape({
  academic_status: Yup.string().required(),
  account_status: Yup.string().required(),
  address: Yup.string().required(),
  citizenship: Yup.string(),
  date_of_birth: Yup.string().required(),
  email: Yup.string().required(),
  family_card_number: Yup.string().required(),
  finance_policy: Yup.boolean().required(),
  first_name: Yup.string().required(),
  gender: Yup.string().required(),
  grade: Yup.string().required(),
  last_name: Yup.string().notRequired().nullable(),
  middle_name: Yup.string(),
  nickname: Yup.string(),
  phone_number: Yup.string().required(),
  place_of_birth: Yup.string().required(),
  previous_school: Yup.string().required(),
  program: Yup.string().required(),
  rank_in_family: Yup.string(),
  registration_number: Yup.string().notRequired().nullable(),
  religion: Yup.string().required(),
  residence_hall_payment: Yup.string().required(),
  residence_hall_policy: Yup.boolean().required(),
  residence_hall: Yup.string().required(),
  school_year: Yup.string().required(),
  section: Yup.string().required(),
  semester: Yup.string().required(),
  status: Yup.string().required(),
  transportation_policy: Yup.boolean().required(),
  transportation: Yup.string().required(),
  tuition_fee: Yup.string().required(),
});

export const StudentEdit: React.FC<IResourceComponentsProps> = () => {
  const theme = useMantineTheme();

  const SECTION_COLOR_THEME = {
    ECP: theme.colors.orange[1],
    ES: theme.colors.orange[2],
    MS: theme.colors.blue[2],
    HS: theme.colors.yellow[2],
  };

  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { formLoading },
    values,
    errors,
  } = useForm<StudentSchema>({
    initialValues: {
      id: undefined,
      academic_status: "",
      account_status: "",
      address: "",
      age: "",
      asother: "",
      citizenship: "",
      date_of_birth: undefined,
      email: "",
      family_card_number: "",
      father_address: "",
      father_company: "",
      father_email: "",
      father_name: "",
      father_occupation: "",
      father_phone_number: "",
      finance_policy: undefined,
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
      registration_number: "-",
      religion: "",
      residence_hall_payment: "",
      residence_hall_policy: undefined,
      residence_hall: "",
      school_year: "",
      section: "",
      semester: "",
      status: "new",
      transportation_policy: undefined,
      transportation: "",
      tuition_fee: "",

      profile_image_url: "",
    },
    transformValues: (values) => {
      return {
        ...values,
        date_of_birth: moment(values.date_of_birth as string).toISOString(true),
      };
    },
    validate: yupResolver(SCHEMA),
    refineCoreProps: {
      redirect: "show",
    },
  });

  const transformedValues = {
    age:
      new Date().getFullYear() -
      moment(values["date_of_birth"] as string).year(),
    section: SECTIONING[values.grade as keyof typeof SECTIONING],
  };

  const imageUploadHandler = async (image: ImageProps) => {
    const filename = `${generateId()}.jpg`;

    const res = await imagekit.upload({
      file: (await blobUrlToBase64(image.croppedImage)) as any,
      fileName: filename,
      folder: "/mis-portal/student-pitures",
    });
    setFieldValue("profile_image_url", res.url);
  };

  const schoolYears = React.useMemo(() => {
    const arr = [...STUDENT_IMPORT_SCHEMA["school_year"].fieldType.options];
    return _reverse(arr);
  }, []);

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Container
        sx={{
          ".mantine-Paper-root": {
            borderColor:
              SECTION_COLOR_THEME[
                transformedValues.section as keyof typeof SECTION_COLOR_THEME
              ],
          },
        }}
      >
        <Card withBorder>
          <Edit.Header />
          <Group mt="lg">
            <AspectRatio ratio={4 / 6} sx={{ maxWidth: 100, width: "100%" }}>
              <PicturePicker
                previewImage={values.profile_image_url as string}
                onSubmit={imageUploadHandler}
              />
            </AspectRatio>
            <div>
              <TextInput
                label="Student ID"
                readOnly
                {...getInputProps("id")}
                variant="unstyled"
              />
              <Radio.Group
                mt="sm"
                label="Student Status"
                {...getInputProps("status")}
              >
                <Radio label="New" value="new" />
                <Radio label="Old" value="old" />
                <Radio label="Transfer" value="transfer" />
              </Radio.Group>
            </div>
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
              data={schoolYears}
              {...getInputProps("school_year")}
            />
            <Box sx={{ flex: 1 }} />
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="NISN"
              {...getInputProps("nisn")}
            />
            <TextInput
              mt="sm"
              mx="xs"
              size="xs"
              label="Registration Number"
              {...getInputProps("registration_number")}
            />
          </Flex>
        </Card>
        <Card shadow="sm" withBorder mt="lg">
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
                value={moment(values.date_of_birth as string).toDate()}
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
              value={transformedValues.age}
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
              <TextInput
                label="Student Status"
                mt="sm"
                mx="xs"
                size="xs"
                readOnly
                {...getInputProps("status")}
                variant="unstyled"
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
              value={transformedValues.section}
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
                  data={
                    STUDENT_IMPORT_SCHEMA["transportation"].fieldType.options
                  }
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
            <Box mt="sm">
              <Input.Label size="xs" mb="xs">
                Transportation Policy
              </Input.Label>
              <Switch
                label={"Signed"}
                size="sm"
                thumbIcon={
                  values["transportation_policy"] ? (
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
                {...getInputProps("transportation_policy")}
                checked={values["transportation_policy"] as boolean}
              />
            </Box>
          </Flex>
          <Flex mx="-xs">
            <Group grow w={"75%"} spacing={0}>
              <Box w="50%">
                <Select
                  mt="sm"
                  mx="xs"
                  size="xs"
                  withinPortal
                  data={
                    STUDENT_IMPORT_SCHEMA["residence_hall"].fieldType.options
                  }
                  label="Residence Hall"
                  {...getInputProps("residence_hall")}
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
                  values["residence_hall_policy"] ? (
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
                {...getInputProps("residence_hall_policy")}
                // checked={values["residence_hall_policy"]}
                checked={values["residence_hall_policy"] as boolean}
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
                {...getInputProps("guardian_address")}
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
              <Box mt="sm">
                <Input.Label size="xs" mb="xs">
                  Finance Policy
                </Input.Label>
                <Switch
                  label={"Signed"}
                  size="sm"
                  thumbIcon={
                    values["finance_policy"] ? (
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
                  {...getInputProps("finance_policy")}
                  checked={values["finance_policy"] as boolean}
                />
              </Box>
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

        <Card withBorder mt="lg">
          <DeveloperInspect
            value={Object.keys(errors).length > 0 && JSON.stringify(errors)}
          />
          <Textarea
            mb="sm"
            label="Note"
            size="xs"
            autosize
            {...getInputProps("note")}
          />
          <Edit.Footer />
        </Card>
        <div style={{ height: "25vh" }}></div>
      </Container>
    </Edit>
  );
};
