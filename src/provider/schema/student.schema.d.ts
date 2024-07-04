export interface StudentSchema {
  id: string;
  nisn: string;

  last_name: string;
  first_name: string;
  middle_name: string;
  nickname: string;

  rank_in_family: string;
  citizenship: string;
  age: number;
  place_of_birth: string;
  date_of_birth: string;
  gender: string;
  address: string;
  phone_number: string;
  email: string;
  previous_school: string;
  religion: string;
  status: "new" | "old" | "transfer";
  semester: number;
  school_year: string;
  registration_number: string;
  academic_status: string;
  asother: string;
  family_card_number: string;
  section: "ECP" | "ES" | "MS" | "HS";
  grade:
    | "KD1"
    | "KD2"
    | "NSY"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12";
  program: string;
  other_program: string;

  transportation: string;
  transportation_policy: boolean;
  pick_up_point: string;

  residence_hall: string;
  residence_hall_policy: boolean;
  residence_hall_payment: string;

  father_name: string;
  father_phone_number: string;
  father_company: string;
  father_occupation: string;
  father_address: string;
  father_email: string;

  mother_name: string;
  mother_company: string;
  mother_phone_number: string;
  mother_occupation: string;
  mother_address: string;
  mother_email: string;

  guardian_name: string;
  guardian_phone_number: string;
  guardian_relation: string;
  guardian_address: string;
  guardian_email: string;

  tuition_fee: number;
  finance_policy: boolean;

  register_date: string;

  document_approval: boolean;
  test_approval: boolean;

  account_status: "active" | "inactive" | "withdrawn" | "graduated";

  profile_image_url: string;
  note: string;
}
