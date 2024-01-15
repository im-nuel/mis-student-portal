import { property } from "lodash";
import { studentSchema } from "../../provider/schema/student";
import { FieldProps } from "../../components/ImportCSV/Content";
import moment from "moment";

export const studentImportSchema: FieldProps[] = [
  {
    key: "id",
    label: "id",
    example: "250",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "student_id",
    label: "student_id",
    example: "6578",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "nisn",
    label: "nisn",
    example: "1164846498",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "last_name",
    label: "last_name",
    example: "Pundoko",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "first_name",
    label: "first_name",
    example: "Imanuel",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "middle_name",
    label: "middle_name",
    example: "Efrat Pujiko",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "nickname",
    label: "nickname",
    example: "Ilo",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "rank_in_family",
    label: "rank_in_family",
    example: "2 of 2",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "citizenship",
    label: "citizenship",
    example: "Indonesia",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "age",
    label: "age",
    example: "24",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "place_of_birth",
    label: "place_of_birth",
    example: "Manado",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "date_of_birth",
    label: "date_of_birth",
    example: "07/05/1999",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "gender",
    label: "gender",
    example: "Male",
    fieldType: {
      type: "select",
      options: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
      ],
    },
  },
  {
    key: "address",
    label: "address",
    example: "Desa Sea, Kecamatan Pineleng, Kabupaten Minahasa",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "phone_number",
    label: "phone_number",
    example: "085299482331",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "email",
    label: "email",
    example: "ilomon10@gmail.com",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "previous_school",
    label: "previous_school",
    example: "SMK Negeri 1 Manado",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "religion",
    label: "religion",
    example: "string",
    fieldType: {
      type: "select",
      options: [
        {
          label: "Islam",
          value: "islam",
        },
        {
          label: "Protestan",
          value: "protestan",
        },
        {
          label: "Catholic",
          value: "catholic",
        },
        {
          label: "Hindu",
          value: "hindu",
        },
        {
          label: "Budha",
          value: "budha",
        },
        {
          label: "Konghucu",
          value: "konghucu",
        },
      ],
    },
  },
  {
    key: "status",
    label: "status",
    example: "New",
    fieldType: {
      type: "select",
      options: [
        {
          label: "New",
          value: "new",
        },
        {
          label: "Old",
          value: "old",
        },
        {
          label: "Transfer",
          value: "transfer",
        },
      ],
    },
  },
  {
    key: "semester",
    label: "semester",
    example: "1",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "school_year",
    label: "school_year",
    example: "2023/2024",
    fieldType: {
      type: "select",
      options: Array.from(
        Array(new Date().getFullYear() - 2000 + 1).keys()
      ).map((i) => {
        const year = 2000 + i;
        return {
          label: `${year}/${year + 1}`,
          value: `${year}/${year + 1}`,
        };
      }),
    },
  },
  {
    key: "registration_number",
    label: "registration_number",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "academic_status",
    label: "academic_status",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "asother",
    label: "asother",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "family_card_number",
    label: "family_card_number",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "section",
    label: "section",
    example: "ES",
    fieldType: {
      type: "select",
      options: [
        {
          label: "ECP",
          value: "ECP",
        },
        {
          label: "ES",
          value: "ES",
        },
        {
          label: "MS",
          value: "MS",
        },
        {
          label: "HS",
          value: "HS",
        },
      ],
    },
  },
  {
    key: "grade",
    label: "grade",
    example: "Grade 1",
    fieldType: {
      type: "select",
      options: [
        {
          label: "Nursery",
          value: "NSY",
        },
        {
          label: "Kinder 1",
          value: "KD1",
        },
        {
          label: "Kinder 2",
          value: "KD2",
        },
        {
          label: "Grade 1",
          value: "1",
        },
        {
          label: "Grade 2",
          value: "2",
        },
        {
          label: "Grade 3",
          value: "3",
        },
        {
          label: "Grade 4",
          value: "4",
        },
        {
          label: "Grade 5",
          value: "5",
        },
        {
          label: "Grade 6",
          value: "6",
        },
        {
          label: "Grade 7",
          value: "7",
        },
        {
          label: "Grade 8",
          value: "8",
        },
        {
          label: "Grade 9",
          value: "9",
        },
        {
          label: "Grade 10",
          value: "10",
        },
        {
          label: "Grade 11",
          value: "11",
        },
        {
          label: "Grade 12",
          value: "12",
        },
      ],
    },
  },
  {
    key: "program",
    label: "program",
    example: "Oxford",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "other_program",
    label: "other_program",
    example: "Cambridge",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "transportation",
    label: "transportation",
    example: "School Bus",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "transportation_policy",
    label: "transportation_policy",
    example: "Signed",
    fieldType: {
      type: "checkbox",
    },
  },
  {
    key: "pick_up_point",
    label: "pick_up_point",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "residence_hall",
    label: "residence_hall",
    example: "Boys Dormitory",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "residence_hall_policy",
    label: "residence_hall_policy",
    example: "Signed",
    fieldType: {
      type: "checkbox",
    },
  },
  {
    key: "residence_hall_payment",
    label: "residence_hall_payment",
    example: "Installment",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "father_name",
    label: "father_name",
    example: "Harly Pundoko",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "father_occupation",
    label: "father_occupation",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "father_company",
    label: "father_company",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "father_address",
    label: "father_address",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "father_phone_number",
    label: "father_phone_number",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "father_email",
    label: "father_email",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "mother_name",
    label: "mother_name",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "mother_occupation",
    label: "mother_occupation",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "mother_company",
    label: "mother_company",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "mother_address",
    label: "mother_address",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "mother_phone_number",
    label: "mother_phone_number",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "mother_email",
    label: "mother_email",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "guardian_name",
    label: "guardian_name",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "guardian_occupation",
    label: "guardian_occupation",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "guardian_company",
    label: "guardian_company",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "guardian_address",
    label: "guardian_address",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "guardian_phone_number",
    label: "guardian_phone_number",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "guardian_email",
    label: "guardian_email",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "guardian_relation",
    label: "guardian_relation",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "tuition_fee",
    label: "tuition_fee",
    example: "number",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "finance_policy",
    label: "finance_policy",
    example: "boolean",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "register_date",
    label: "register_date",
    example: "string",
    fieldType: {
      type: "input",
    },
  },
  {
    key: "document_approval",
    label: "document_approval",
    example: "Approved",
    fieldType: {
      type: "checkbox",
    },
  },
  {
    key: "test_approval",
    label: "test_approval",
    example: "Approved",
    fieldType: {
      type: "checkbox",
    },
  },
  {
    key: "account_status",
    label: "account_status",
    example: "Active",
    fieldType: {
      type: "select",
      options: [
        {
          label: "Active",
          value: "active",
        },
        {
          label: "Inactive",
          value: "inactive",
        },
        {
          label: "Withdrawn",
          value: "withdrawn",
        },
        {
          label: "Graduated",
          value: "graduated",
        },
      ],
    },
  },
];
