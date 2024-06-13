import React, { useEffect } from "react";
import { renderAsync } from "docx-preview";
import { CheckBox, patchDocument, PatchType, TextRun } from "docx";
import _ from "lodash";
import "../../components/font-awesome_font-face.css";
import { StudentSchema } from "../../provider/schema/student.schema";
import { useList, useOne } from "@refinedev/core";
import { SiteConfigSchema } from "../../provider/schema/site-config";
import { remoteFileReader } from "../../provider/utils/remoteFileReader";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";

// new CheckBox({
//   checked: true,
//   checkedState: { value: "f14a", font: "'Font Awesome 6 Free'" },
//   uncheckedState: { value: "f0c8", font: "'Font Awesome 6 Free'" },
// }),

const DEFAULT_TEXT_FONT = "Times New Roman";
const CHECKBOX_FONT_FAMILY = "'Font Awesome 6 Free'";

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

export const DocumentPreview = ({ student }: { student: StudentSchema }) => {
  const canvas_preview = React.useRef<HTMLDivElement>(
    document.createElement("div")
  );
  const preview = React.useRef<HTMLDivElement>(null);
  const style_preview = React.useRef(null);

  const handlePrint = useReactToPrint({
    content: () => preview.current,
    // copyStyles: false,
    pageStyle: `
      @page {
        /* Remove browser default header (title) and footer (url) */
        margin: 0;
      }
      @media print {
          body {
              /* Tell browsers to print background colors */
              -webkit-print-color-adjust: exact; /* Chrome/Safari/Edge/Opera */
              color-adjust: exact; /* Firefox */
          }
      }
    `,
    srcdoc: " ",
  });

  const [fileTemplate, setFileTemplate] = React.useState<Blob | null>(null);
  const [fileBlob, setFileBlob] = React.useState<Blob | Uint8Array | null>(
    null
  );

  const siteConfigRes = useList<SiteConfigSchema>({
    resource: "site-config",
    filters: [
      {
        field: "name",
        operator: "eq",
        value: "student-document-template",
      },
    ],
  });

  const documentTemplate = siteConfigRes.data?.data[0];

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
    signed: false,
    fp: false,
    i: false,
  };

  const residence_hall = {
    boy: false,
    girl: false,
    signed: false,
    fp: false,
    i: false,
  };

  const tuition_fee = {
    signed: false,
    fp: false,
    i: false,
  };

  const finance_policy = {
    signed: false,
  };

  useEffect(() => {
    const run = async () => {
      if (!documentTemplate) return;
      const fileRes = await remoteFileReader(documentTemplate.value);
      setFileTemplate(fileRes);
    };
    run();
  }, [documentTemplate]);

  useEffect(() => {
    if (_.isEmpty(student) || !fileTemplate) return;
    const run = async () => {
      const docs = await patchDocument(fileTemplate, {
        keepOriginalStyles: true,
        patches: {
          full_name: {
            type: PatchType.PARAGRAPH,
            children: [
              new TextRun({
                text: `${student.last_name}, ${student.first_name} ${student.middle_name}`,
              }),
            ],
          },
          school_year: {
            type: PatchType.PARAGRAPH,
            children: [
              new TextRun({
                text: student.school_year,
              }),
            ],
          },
          rank_in_fam: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.rank_in_family)],
          },
          grade: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.grade)],
          },
          citizenship: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.citizenship)],
          },
          nickname: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.nickname)],
          },
          semester: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(`${student.semester}`)],
          },
          reg_no: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.registration_number)],
          },
          gender: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.gender)],
          },
          home_address: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.address)],
          },
          email: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.email)],
          },
          prev_school: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.previous_school)],
          },
          phone: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.phone_number)],
          },
          religion: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.religion)],
          },
          student_status: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.status)],
          },
          academic_status: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.academic_status)],
          },
          father_name: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.father_name)],
          },
          father_company: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.father_company)],
          },
          father_occupation: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.father_occupation)],
          },
          father_address: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.father_address)],
          },
          father_phone: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.father_phone_number)],
          },
          father_email: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.father_email)],
          },
          mother_name: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.mother_name)],
          },
          mother_company: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.mother_company)],
          },
          mother_occupation: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.mother_occupation)],
          },
          mother_address: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.mother_address)],
          },
          mother_phone: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.mother_phone_number)],
          },
          mother_email: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.mother_email)],
          },
          guardian_name: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.guardian_name)],
          },
          guardian_relation: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.guardian_relation)],
          },
          guardian_address: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.guardian_address)],
          },
          guardian_phone_number: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.guardian_phone_number)],
          },
          age: {
            type: PatchType.PARAGRAPH,
            children: [
              new TextRun(
                `${
                  new Date().getFullYear() -
                  moment(student["date_of_birth"]).year()
                }`
              ),
            ],
          },
          place_date_of_birth: {
            type: PatchType.PARAGRAPH,
            children: [
              new TextRun(
                `${student.place_of_birth}, ${moment(
                  student.date_of_birth
                ).format("MMMM DD, YYYY")}`
              ),
            ],
          },
          pup: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.pick_up_point)],
          },
          ...mapTheCheckbox(section, "sc"),
          ...mapTheCheckbox(program, "prg"),
          prg_others_value: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(student.other_program)],
          },
          ...mapTheCheckbox(transportation, "tp"),
          ...mapTheCheckbox(residence_hall, "rh"),
          ...mapTheCheckbox(tuition_fee, "tf"),
          ...mapTheCheckbox(finance_policy, "fpc"),
        },
      });
      // setFileBlob(new Blob([docs]));
      setFileBlob(docs);
    };
    run();
  }, [student, fileTemplate]);

  useEffect(() => {
    if (!fileBlob) return;
    const run = async () => {
      // const el = new HTMLDivElement();
      if (
        !fileBlob ||
        !preview.current ||
        !style_preview.current ||
        !canvas_preview.current
      )
        return;

      await renderAsync(fileBlob, preview.current, undefined, {
        experimental: true,
        inWrapper: false,
        renderChanges: true,
        debug: true,
      });
    };

    run();
  }, [fileBlob]);

  return (
    <div>
      <Button leftIcon={<IconPrinter />} onClick={() => handlePrint()}>
        Print
      </Button>
      <div ref={style_preview}></div>
      <div
        ref={preview}
        // sx={{
        //   position: "absolute",
        //   left: "1000px",
        // }}
      ></div>
    </div>
  );
};
