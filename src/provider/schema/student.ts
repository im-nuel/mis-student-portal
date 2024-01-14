import { Type } from "@feathersjs/typebox";

// Main data model schema
export const studentSchema = Type.Object(
  {
    id: Type.Number(),
    student_id: Type.String(),
    nisn: Type.String(),

    last_name: Type.String(),
    first_name: Type.String(),
    middle_name: Type.String(),
    nickname: Type.String(),

    rank_in_family: Type.String(),
    citizenship: Type.String(),
    age: Type.Number(),
    place_of_birth: Type.String(),
    date_of_birth: Type.String(),
    gender: Type.String(),
    address: Type.String(),
    phone_number: Type.String(),
    email: Type.String(),
    previous_school: Type.String(),
    religion: Type.String(),
    status: Type.Enum({
      new: "new",
      old: "old",
      transfer: "transfer",
    }),
    semester: Type.Number(),
    school_year: Type.String(),
    registration_number: Type.String(),
    academic_status: Type.String(),
    asother: Type.String(),
    family_card_number: Type.String(),
    section: Type.Enum({
      ECP: "ECP",
      ES: "ES",
      MS: "MS",
      HS: "HS",
    }),
    grade: Type.Enum({
      KD1: "KD1",
      KD2: "KD2",
      NSY: "NSY",
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9",
      "10": "10",
      "11": "11",
      "12": "12",
    }),
    program: Type.String(),
    other_program: Type.String(),

    transportation: Type.String(),
    transportation_policy: Type.Boolean(),
    pick_up_point: Type.String(),

    residence_hall: Type.String(),
    residence_hall_policy: Type.Boolean(),
    residence_hall_payment: Type.String(),

    father_name: Type.String(),
    father_occupation: Type.String(),
    father_company: Type.String(),
    father_address: Type.String(),
    father_phone_number: Type.String(),
    father_email: Type.String(),

    mother_name: Type.String(),
    mother_occupation: Type.String(),
    mother_company: Type.String(),
    mother_address: Type.String(),
    mother_phone_number: Type.String(),
    mother_email: Type.String(),

    guardian_name: Type.String(),
    guardian_occupation: Type.String(),
    guardian_company: Type.String(),
    guardian_address: Type.String(),
    guardian_phone_number: Type.String(),
    guardian_email: Type.String(),
    guardian_relation: Type.String(),

    tuition_fee: Type.Number(),
    finance_policy: Type.Boolean(),

    register_date: Type.String(),

    document_approval: Type.Boolean(),
    test_approval: Type.Boolean(),

    account_status: Type.Enum({
      active: "active",
      inactive: "inactive",
      withdrawn: "withdrawn",
      graduated: "graduated",
    }),
  },
  { $id: "Student", additionalProperties: false }
);
