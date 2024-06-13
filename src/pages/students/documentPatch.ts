import { StudentSchema } from "../../provider/schema/student.schema";
import { remoteFileReader } from "../../provider/utils/remoteFileReader";
import { CheckBox, patchDocument, PatchType, TextRun } from "docx";
import moment from "moment";
import _ from "lodash";

const DEFAULT_TEXT_FONT = "Times New Roman";
const CHECKBOX_FONT_FAMILY = "'Font Awesome 6 Free'";

export const documentPatch = async (
  docuemntTemplateUrl: string,
  record: StudentSchema
) => {
  const section = {
    ecp: false,
    es: false,
    ms: false,
    hs: false,
  };

  const program = {
    uan: false,
    abeka: false,
    cambridge: false,
    others: false,
  };

  const transportation = {
    car: false,
    bus: false,
  };

  const residence_hall = {
    boy: false,
    girl: false,
  };

  const documentTemplate = await remoteFileReader(docuemntTemplateUrl);

  const docs = await patchDocument(documentTemplate, {
    keepOriginalStyles: true,
    patches: {
      full_name: {
        type: PatchType.PARAGRAPH,
        children: [
          new TextRun({
            text: `${record.last_name}, ${record.first_name} ${record.middle_name}`,
          }),
        ],
      },
      school_year: {
        type: PatchType.PARAGRAPH,
        children: [
          new TextRun({
            text: record.school_year,
          }),
        ],
      },
      rank_in_fam: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(record.rank_in_family)],
      },
      grade: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(record.grade)],
      },
      citizenship: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(record.citizenship)],
      },
      nickname: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(record.nickname)],
      },
      semester: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(`${record.semester}`)],
      },
      reg_no: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(record.registration_number)],
      },
      gender: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(record.gender)],
      },
      home_address: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(record.address)],
      },
      email: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(record.email)],
      },
      prev_school: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(record.previous_school)],
      },
      phone: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(record.phone_number)],
      },
      religion: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(record.religion)],
      },
      student_status: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(record.status)],
      },
      academic_status: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(record.academic_status)],
      },
      age: {
        type: PatchType.PARAGRAPH,
        children: [
          new TextRun(
            `${
              new Date().getFullYear() - moment(record["date_of_birth"]).year()
            }`
          ),
        ],
      },
      place_date_of_birth: {
        type: PatchType.PARAGRAPH,
        children: [
          new TextRun(
            `${record.place_of_birth}, ${moment(record.date_of_birth).format(
              "MMMM DD, YYYY"
            )}`
          ),
        ],
      },
      ...mapTheCheckbox(section, "sc"),
      ...mapTheCheckbox(program, "prg"),
      ...mapTheCheckbox(transportation, "tp"),
      ...mapTheCheckbox(residence_hall, "rh"),
    },
  });

  return docs;
};

const mapTheCheckbox = (list: { [key: string]: boolean }, prefix: string) =>
  _.chain(list)
    .mapValues((value) => {
      return {
        type: PatchType.PARAGRAPH,
        children: [
          new CheckBox({
            checked: value,
            checkedState: {
              value: "f14a",
              font: CHECKBOX_FONT_FAMILY,
            },
            uncheckedState: {
              value: "f0c8",
              font: CHECKBOX_FONT_FAMILY,
            },
          }),
        ],
      };
    })
    .mapKeys((value, key) => `${prefix}_${key}`)
    .value();
