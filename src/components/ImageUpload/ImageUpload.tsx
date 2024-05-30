import { useState } from "react";
import { FaRegImage } from "react-icons/fa";

import InputFile from "components/InputFile/InputFile";
import Button from "components/Button/Button";

import {
  ButtonWrapper,
  IconWithoutImageWrapper,
  Image,
  UploadWrapper,
  WithoutImageWrapper,
} from "./styles";

function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <UploadWrapper>
      {!file && (
        <>
          <WithoutImageWrapper>
            <IconWithoutImageWrapper>
              <FaRegImage size="40px" />
            </IconWithoutImageWrapper>
          </WithoutImageWrapper>
          <InputFile
            name="file-upload"
            label="Upload Image"
            onChange={handleFileChange}
          />
        </>
      )}
      {preview && (
        <>
          <Image src={preview} alt="Image preview" />
          <ButtonWrapper>
            <Button
              onButtonClick={handleFileRemove}
              type="submit"
              name="Remove Image"
            />
          </ButtonWrapper>
        </>
      )}
    </UploadWrapper>
  );
}

export default ImageUpload;
