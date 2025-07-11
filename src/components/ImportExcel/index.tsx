import { useState } from "react";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import * as XLSX from "xlsx";

export const ImportExcel = () => {
  const [step, setStep] = useState(1);
  const [parsedData, setParsedData] = useState<any[]>([]);

  // Step 1 subjects
  const [majorSubjects, setMajorSubjects] = useState<string[]>([""]);
  const [electiveSubjects, setElectiveSubjects] = useState<string[]>([""]);

  // Step 2 state
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);

  // Step 3 meta (signatures, names, date)
  const [step3Meta, setStep3Meta] = useState({
    date: "",
    homeroom: "",
    principal: "",
    homeroomSignature: "",
    principalSignature: "",
  });

  // Step 3 layout settings (font size & line height)
  const [fontSettings, setFontSettings] = useState({
    fontSize: 11,
    lineHeight: 1.2,
  });

  return (
    <>
      {step === 1 && (
        <Step1
          major={majorSubjects}
          elective={electiveSubjects}
          setMajor={setMajorSubjects}
          setElective={setElectiveSubjects}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <Step2
          onNext={(transformedRows) => {
            setParsedData(transformedRows);
            setStep(3);
          }}
          onBack={() => setStep(1)}
          workbook={workbook}
          setWorkbook={setWorkbook}
          selectedSheet={selectedSheet}
          setSelectedSheet={setSelectedSheet}
          majorSubjects={majorSubjects}
          electiveSubjects={electiveSubjects}
        />
      )}

      {step === 3 && (
        <Step3
          data={parsedData}
          onBack={() => setStep(2)}
          meta={step3Meta}
          setMeta={setStep3Meta}
          fontSettings={fontSettings}
          setFontSettings={setFontSettings}
        />
      )}
    </>
  );
};