import {
  AspectRatio,
  BackgroundImage,
  Box,
  Card,
  Image,
  Text,
} from "@mantine/core";
import React from "react";
import { StudentSchema } from "../../provider/schema/student.schema";
import { capitalizeString } from "../utils/capitalized";
import moment from "moment";
import { idValidity } from "../utils/idValidity";
import { overflow } from "html2canvas/dist/types/css/property-descriptors/overflow";
import QRCode from "react-qr-code";

const COLOR_SECTION = {
  ECP: "white",
  ES: "white",
  MS: "white",
  HS: "black",
};

export const IDCardPreview = React.forwardRef<
  HTMLDivElement,
  {
    src: string;
    record: StudentSchema;
    showQrCode?: boolean;
  }
>(({ src, record, showQrCode }, ref) => {
  const left = 35;
  const color = COLOR_SECTION[record.section];
  return (
    <Card withBorder mt="md">
      <Card.Section bg={"#eee"}>
        <AspectRatio ratio={54 / 85.6}>
          <div ref={ref} style={{ overflow: "hidden" }}>
            <Image src={src} sx={{ pointerEvents: "none" }} />
            <Box pos={"absolute"} left={230} top={98} w={147}>
              <AspectRatio ratio={2 / 3}>
                <BackgroundImage src={record.profile_image_url} />
              </AspectRatio>
            </Box>
            <Box pos={"absolute"} left={30} top={240}>
              <Text
                sx={{
                  lineHeight: 1,
                  fontSize: 15,
                  fontFamily: "Poppins",
                  color,
                }}
              >
                {record.school_year}
              </Text>
            </Box>
            <Box pos={"absolute"} left={30} top={297}>
              <Text
                sx={{
                  lineHeight: 1,
                  fontSize: 15,
                  fontFamily: "Poppins",
                  color,
                }}
              >
                June 20,{" "}
                {Number(record.school_year.split("/")[0]) + idValidity(record.grade)}
              </Text>
            </Box>
            <Box pos={"absolute"} left={left} top={343}>
              {record.last_name?.trim() && (
                <Text
                  sx={{
                    lineHeight: 1,
                    fontSize: 41,
                    fontFamily: "Poppins",
                    color,
                  }}
                >
                  {capitalizeString(record.last_name.trim())},
                </Text>
              )}
              <Text
                sx={{
                  lineHeight: record.last_name?.trim() ? 1 : 4,
                  fontSize: 24,
                  fontFamily: "Poppins",
                  color,
                  whiteSpace: "nowrap",
                }}
              >
                {capitalizeString(
                  `${record.first_name} ${record.middle_name || ""}`
                ).slice(0, 27)}
              </Text>
            </Box>
            <Box pos={"absolute"} left={left} top={447}>
              <Text
                sx={{
                  lineHeight: 1,
                  fontSize: 17,
                  fontFamily: "Poppins",
                  color,
                }}
              >
                {record.nisn && record.nisn !== "NULL" ? `${record.nisn}/${record.id}` : record.id}
              </Text>
            </Box>
            <Box pos={"absolute"} left={left} top={503}>
              <Text
                sx={{
                  lineHeight: 1,
                  fontSize: 17,
                  fontFamily: "Poppins",
                  color,
                }}
              >
                {capitalizeString(record.place_of_birth)}
                {", "}
                {moment(record.date_of_birth).format("DD/MM/YYYY")}
              </Text>
            </Box>
            {showQrCode && (
              <Box pos="absolute" right={24} top={420} bg="white" p={5}>
                <QRCode
                  value={String(record.id)}
                  size={83} // adjust size as needed
                  bgColor="white"
                  fgColor="black"
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </Box>
            )}
          </div>
        </AspectRatio>
      </Card.Section>
    </Card>
  );
});
