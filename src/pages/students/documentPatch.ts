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
  const values = fillNullWithEmptyString(record) as StudentSchema;
  const section = {
    ecp: values.section === "ECP",
    es: values.section === "ES",
    ms: values.section === "MS",
    hs: values.section === "HS",
  };

  const program = {
    uan: values.program === "UAN",
    abeka: values.program === "ABEKA",
    cambridge: values.program === "CAMBRIDGE",
    others: !_.isEmpty(values.other_program),
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
            text: `${values.last_name}, ${values.first_name} ${values.middle_name}`,
          }),
        ],
      },
      school_year: {
        type: PatchType.PARAGRAPH,
        children: [
          new TextRun({
            text: values.school_year,
          }),
        ],
      },
      rank_in_fam: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(values.rank_in_family)],
      },
      grade: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(values.grade)],
      },
      citizenship: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(values.citizenship)],
      },
      nickname: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(values.nickname)],
      },
      semester: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(`${values.semester}`)],
      },
      reg_no: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(values.registration_number)],
      },
      gender: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(values.gender)],
      },
      home_address: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(values.address)],
      },
      email: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(values.email)],
      },
      prev_school: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(values.previous_school)],
      },
      phone: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(values.phone_number)],
      },
      religion: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(values.religion)],
      },
      student_status: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(values.status)],
      },
      academic_status: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(values.academic_status)],
      },
      age: {
        type: PatchType.PARAGRAPH,
        children: [
          new TextRun(
            `${
              new Date().getFullYear() - moment(values["date_of_birth"]).year()
            }`
          ),
        ],
      },
      place_date_of_birth: {
        type: PatchType.PARAGRAPH,
        children: [
          new TextRun(
            `${values.place_of_birth}, ${moment(values.date_of_birth).format(
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

function fillNullWithEmptyString(obj: any): any {
  const result = _.cloneDeep(obj);

  _.forOwn(result, (value, key) => {
    if (_.isNull(value)) {
      result[key] = "";
    } else if (_.isObject(value) && !_.isArray(value)) {
      result[key] = fillNullWithEmptyString(value);
    }
  });

  return result;
}
