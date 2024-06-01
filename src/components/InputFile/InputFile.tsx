import { useState } from "react";

import Button from "components/Button/Button";

import {
  ButtonWrapper,
  CustomFileInputWrapper,
  HiddenFileInput,
} from "./styles";
import { CustomFileInputProps } from "./types";

function InputFile({ name, onChange }: CustomFileInputProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fileName, setFileName] = useState<string | null>(null);
  console.log(fileName);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
    onChange(event);
  };

  const handleUploadButtonClick = () => {
    const hiddenInput = document.getElementById(name) as HTMLInputElement;
    hiddenInput.click();
  };

  return (
    <CustomFileInputWrapper>
      <HiddenFileInput id={name} type="file" onChange={handleFileChange} />
      <ButtonWrapper>
        <Button
          type="button"
          name="Upload Image"
          onButtonClick={handleUploadButtonClick}
        />
      </ButtonWrapper>
    </CustomFileInputWrapper>
  );
}

export default InputFile;
