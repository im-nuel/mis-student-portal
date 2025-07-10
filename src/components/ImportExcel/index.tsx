import { useState } from "react";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";

export const ImportExcel = () => {
  const [step, setStep] = useState(1);
  const [parsedData, setParsedData] = useState<any[]>([]);

  return (
    <>
      {step === 1 && <Step1 onNext={() => setStep(2)} />}

      {step === 2 && (
        <Step2
          onNext={(transformedRows) => {
            setParsedData(transformedRows);
            setStep(3);
          }}
        />
      )}

      {step === 3 && <Step3 data={parsedData} />}
    </>
  );
};