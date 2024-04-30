import { Fields } from "react-spreadsheet-import/types/types";

export const studentImportSchema: Fields<string>[] = [
  {
    key: "id",
    label: "id",
    example: "250",
    fieldType: {
      type: "input",
    },
    validations: [
      {
        rule: "required",
        errorMessage: "id is required",
      },
      {
        rule: "unique",
        errorMessage: "id must be unique",
        level: "info",
      },
    ],
    alternateMatches: ["student_id"],
  },
  {
    key: "nisn",
    label: "nisn",
    example: "1164846498",
    fieldType: {
      type: "input",
    },
    validations: [
      {
        rule: "required",
        errorMessage: "nisn is required",
      },
      {
        rule: "unique",
        errorMessage: "nisn must be unique",
        level: "info",
      },
    ],
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
    validations: [
      {
        rule: "required",
        errorMessage: "first_name is required",
      },
    ],
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
    alternateMatches: ["rank", "rank in fam"],
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
    alternateMatches: ["pob"],
  },
  {
    key: "date_of_birth",
    label: "date_of_birth",
    example: "07/05/1999",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["dob"],
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
    alternateMatches: ["phone"],
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
    alternateMatches: ["school", "prev school"],
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
          label: "Advent",
          value: "christian_advent",
        },
        {
          label: "Protestant",
          value: "christian_protestant",
        },
        {
          label: "Catholic",
          value: "christian_catholic",
        },
        {
          label: "Hindu",
          value: "hindu",
        },
        {
          label: "Buddha",
          value: "buddha",
        },
        {
          label: "Confucian",
          value: "confucian",
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
      type: "select",
      options: [
        { label: "1st", value: "first" },
        { label: "2nd", value: "second" },
      ],
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
    alternateMatches: ["reg number", "registration", "registration no"],
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
    alternateMatches: ["family card"],
  },
  {
    key: "section",
    label: "section",
    example: "ES",
    fieldType: {
      type: "select",
      options: [
        {
          label: "Early Childhood Program",
          value: "ECP",
        },
        {
          label: "Elementary School",
          value: "ES",
        },
        {
          label: "Middle School",
          value: "MS",
        },
        {
          label: "High School",
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
          value: "G1",
        },
        {
          label: "Grade 2",
          value: "G2",
        },
        {
          label: "Grade 3",
          value: "G3",
        },
        {
          label: "Grade 4",
          value: "G4",
        },
        {
          label: "Grade 5",
          value: "G5",
        },
        {
          label: "Grade 6",
          value: "G6",
        },
        {
          label: "Grade 7",
          value: "G7",
        },
        {
          label: "Grade 8",
          value: "G8",
        },
        {
          label: "Grade 9",
          value: "G9",
        },
        {
          label: "Grade 10",
          value: "G10",
        },
        {
          label: "Grade 11",
          value: "G11",
        },
        {
          label: "Grade 12",
          value: "G12",
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
    alternateMatches: ["other program", "other_prog"],
  },
  {
    key: "transportation",
    label: "transportation",
    example: "School Bus",
    fieldType: {
      type: "select",
      options: [
        { label: "School Bus", value: "school_bus" },
        { label: "Own Vehicle", value: "own_vehicle" },
      ],
    },
  },
  {
    key: "transportation_policy",
    label: "transportation_policy",
    example: "Signed",
    fieldType: {
      type: "checkbox",
    },
    alternateMatches: ["trans policy"],
  },
  {
    key: "pick_up_point",
    label: "pick_up_point",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["point", "pup_point"],
  },
  {
    key: "residence_hall",
    label: "residence_hall",
    example: "Boys Dormitory",
    fieldType: {
      type: "select",
      options: [
        {
          label: "Boys' Dormitory",
          value: "boys_dormitory",
        },
        {
          label: "Girls' Dormitory",
          value: "girls_dormitory",
        },
        {
          label: "Non-Residence Hall",
          value: "non_residence_hall",
        },
      ],
    },
    alternateMatches: ["rec_hall"],
  },
  {
    key: "residence_hall_policy",
    label: "residence_hall_policy",
    example: "Signed",
    fieldType: {
      type: "checkbox",
    },
    alternateMatches: ["rhall_policy"],
  },
  {
    key: "residence_hall_payment",
    label: "residence_hall_payment",
    example: "Installment",
    fieldType: {
      type: "select",
      options: [
        {
          label: "Full Payment",
          value: "full_payment",
        },
        {
          label: "Installment",
          value: "installment",
        },
      ],
    },
    alternateMatches: ["rec_hall_pay"],
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
    alternateMatches: ["father_occup"],
  },
  {
    key: "father_company",
    label: "father_company",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["father_comp"],
  },
  {
    key: "father_address",
    label: "father_address",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["father_addr"],
  },
  {
    key: "father_phone_number",
    label: "father_phone_number",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["father_phone"],
  },
  {
    key: "father_email",
    label: "father_email",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["father_addr"],
  },
  {
    key: "mother_name",
    label: "mother_name",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["mother_name"],
  },
  {
    key: "mother_occupation",
    label: "mother_occupation",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["mother_occup"],
  },
  {
    key: "mother_company",
    label: "mother_company",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["mother_comp"],
  },
  {
    key: "mother_address",
    label: "mother_address",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["mother_addr"],
  },
  {
    key: "mother_phone_number",
    label: "mother_phone_number",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["mother_phone"],
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
    alternateMatches: ["guardian_name"],
  },
  {
    key: "guardian_occupation",
    label: "guardian_occupation",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["guardian_occup"],
  },
  {
    key: "guardian_company",
    label: "guardian_company",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["guardian_comp"],
  },
  {
    key: "guardian_address",
    label: "guardian_address",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["guardian_addr"],
  },
  {
    key: "guardian_phone_number",
    label: "guardian_phone_number",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["guardian_phone"],
  },
  {
    key: "guardian_email",
    label: "guardian_email",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["guardian_email"],
  },
  {
    key: "guardian_relation",
    label: "guardian_relation",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["rel_student"],
  },
  {
    key: "tuition_fee",
    label: "tuition_fee",
    example: "Installment",
    fieldType: {
      type: "select",
      options: [
        {
          label: "Full Payment",
          value: "full_payment",
        },
        {
          label: "Installment",
          value: "installment",
        },
      ],
    },
  },
  {
    key: "finance_policy",
    label: "finance_policy",
    example: "boolean",
    fieldType: {
      type: "checkbox",
    },
    alternateMatches: ["fin_policy_con"],
  },
  {
    key: "register_date",
    label: "register_date",
    example: "string",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["reg_date"],
  },
  {
    key: "document_approval",
    label: "document_approval",
    example: "Approved",
    fieldType: {
      type: "checkbox",
    },
    alternateMatches: ["apv_doc"],
  },
  {
    key: "test_approval",
    label: "test_approval",
    example: "Approved",
    fieldType: {
      type: "checkbox",
    },
    alternateMatches: ["apv_test"],
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

export const STUDENT_IMPORT_SCHEMA: { [key: string]: Fields<any> } =
  studentImportSchema.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.key]: curr,
    };
  }, {});
