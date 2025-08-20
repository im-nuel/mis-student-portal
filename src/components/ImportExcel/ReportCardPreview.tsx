import React from "react";
import { Box, Text } from "@mantine/core";
import templateA4 from "./ReportTemplateA4.jpg";
import templateF4 from "./ReportTemplateF4.jpg";

type Props = {
  student: any;
  paperSize: "A4" | "F4";
  fontSize: number;
  lineHeight: number;
  subjectsFontSize: number;
  homeroomFontSize: number;
  principalFontSize: number;
  date: string;
  homeroom: string;
  principal: string;
  homeroomSignature: any;
  principalSignature: any;
};

export const ReportCardPreview: React.FC<Props> = ({ student, paperSize, fontSize, lineHeight, subjectsFontSize, homeroomFontSize, principalFontSize, date, homeroom, principal, homeroomSignature, principalSignature }) => {
  const width = paperSize === "F4" ? 1248 : 1123;
  const height = 794;
  const backgroundImage = paperSize === "F4" ? templateF4 : templateA4;

  return (
    <Box
      pos="relative"
      w={width}
      h={height}
      mb="xl"
      mx="auto"
      style={{
        overflow: "hidden",
        background: "#fff",
        pageBreakAfter: "always",
        boxShadow: "0 0 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* High-resolution image rendered at exact size */}
      <img
        src={backgroundImage}
        alt="Report Card Template"
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
        draggable={false}
      />

      <Box style={{ position: "relative", zIndex: 1 }}>
        <Text
          style={{
            position: "absolute",
            top: 36,
            left: 720,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {student.name}
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 51,
            left: 720,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {student.grade}
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 66,
            left: 720,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {student.id} / {student.nisn}
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 64,
            left: 948,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {student.semester}
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 560,
            right: 540,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {student.gpa}
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 652,
            left: 550,
            fontSize: 11,
            fontWeight: 600
            ,
          }}
        >
          {student.sick}
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 670,
            left: 550,
            fontSize: 11,
            fontWeight: 600
            ,
          }}
        >
          {student.excuse}
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 687,
            left: 550,
            fontSize: 11,
            fontWeight: 600
            ,
          }}
        >
          {student.late}
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 703,
            left: 550,
            fontSize: 11,
            fontWeight: 600
            ,
          }}
        >
          {student.absent}
        </Text>

        <Box
          pos="absolute"
          top={603}
          left={605}
          w={430} // leave space on the sides
          h={100} // set height depending on space
          p="sm"
          bg="transparent"
          style={{
            fontFamily: "Calibri, sans-serif",
              fontSize: fontSize,
              lineHeight: lineHeight,
            overflow: "auto",
            whiteSpace: "pre-wrap", // preserve newlines
            zIndex: 1,
          }}
        >
          {student.notes || "-"}
        </Box>

        <Text
          style={{
            position: "absolute",
            top: 157,
            left: 145,
            fontSize: 11,
            fontWeight: 800
            ,
          }}
        >
          MAJOR SUBJECTS:
        </Text>

        {student.major_subject?.map((subject: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 179 + index * 19.4, // vertical spacing between each line
              left: 145,
              fontSize: subjectsFontSize, // adjustable from settings
              fontWeight: 600
            }}
          >
            {subject}
          </Text>
        ))}

        {student.major_credit?.map((credit: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 179 + index * 19.4, // 20 spacing between each line
              left: 407,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {credit}
          </Text>
        ))}

        {student.major_academic_value?.map((academic_value: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 179 + index * 19.4, // 20 spacing between each line
              left: 447,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {academic_value}
          </Text>
        ))}

        {student.major_academic_level?.map((academic_level: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 179 + index * 19.4, // 20 spacing between each line
              left: 507,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {academic_level}
          </Text>
        ))}

        {student.major_academic_point?.map((academic_point: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 179 + index * 19.4, // 20 spacing between each line
              right: 540,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {academic_point}
          </Text>
        ))}

        {student.major_behavior_value?.map((behavior_value: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 179 + index * 19.4, // 20 spacing between each line
              left: 615,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {behavior_value}
          </Text>
        ))}

        {student.major_behavior_level?.map((behavior_level: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 179 + index * 19.4, // 20 spacing between each line
              left: 688,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {behavior_level}
          </Text>
        ))}

        {student.major_behavior_remarks?.map((behavior_remarks: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 179 + index * 19.4, // 20 spacing between each line
              left: 729,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {behavior_remarks}
          </Text>
        ))}

        <Text
          style={{
            position: "absolute",
            top: 161 + 290,
            left: 145,
            fontSize: 11,
            fontWeight: 800
            ,
          }}
        >
          ELECTIVE SUBJECTS:
        </Text>

        {student.elective_subject?.map((subject: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 180 + 290 + index * 18.7, // 20 spacing between each line
              left: 145,
              fontSize: subjectsFontSize,
              fontWeight: 600
            }}
          >
            {subject}
          </Text>
        ))}

        {student.elective_credit?.map((credit: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 180 + 290 + index * 18.7, // 20 spacing between each line
              left: 407,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {credit}
          </Text>
        ))}

        {student.elective_academic_value?.map((academic_value: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 180 + 290 + index * 18.7, // 20 spacing between each line
              left: 447,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {academic_value}
          </Text>
        ))}

        {student.elective_academic_level?.map((academic_level: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 180 + 290 + index * 18.7, // 20 spacing between each line
              left: 507,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {academic_level}
          </Text>
        ))}

        {student.elective_academic_point?.map((academic_point: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 180 + 290 + index * 18.7, // 20 spacing between each line
              right: 540,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {academic_point}
          </Text>
        ))}

        {student.elective_behavior_value?.map((behavior_value: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 180 + 290 + index * 18.7, // 20 spacing between each line
              left: 615,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {behavior_value}
          </Text>
        ))}

        {student.elective_behavior_level?.map((behavior_level: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 180 + 290 + index * 18.7, // 20 spacing between each line
              left: 688,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {behavior_level}
          </Text>
        ))}

        {student.elective_behavior_remarks?.map((behavior_remarks: string, index: number) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: 180 + 290 + index * 18.7, // 20 spacing between each line
              left: 729,
              fontSize: 11,
              fontWeight: 600
            }}
          >
            {behavior_remarks}
          </Text>
        ))}

        <Text
          style={{
            position: "absolute",
            top: 663,
            left: 698,
            fontSize: 11,
            fontWeight: 400,
          }}
        >
          {date}
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 736,
            left: 597,
            width: 173,
            textAlign: "center",
            fontSize: homeroomFontSize,
            fontWeight: 600,
          }}
        >
          {homeroom}
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 736,
            left: 747,
            width: 173,
            textAlign: "center",
            fontSize: principalFontSize,
            fontWeight: 600,
          }}
        >
          {principal}
        </Text>

        <Box
          style={{
            position: "absolute",
            top: 688,
            left: 593,
            width: 173,
            height: 65,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {homeroomSignature && (
            <img
              src={homeroomSignature}
              alt="Homeroom Signature"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </Box>

        <Box
          style={{
            position: "absolute",
            top: 688,
            left: 742,
            width: 173,
            height: 65,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {principalSignature && (
            <img
              src={principalSignature}
              alt="Principal Signature"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </Box>

      </Box>
    </Box>
  );
};