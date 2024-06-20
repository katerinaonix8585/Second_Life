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

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newFile = event.target.files?.[0];
    if (newFile) {
      setFile(newFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(newFile);

      await handleUploadImage(newFile);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setPreview(null);
  };

  const handleUploadImage = async (uploadedFile: File) => {
    setStatus("loading");
    setError(undefined);

    const formData = new FormData();
    formData.append("entityType", "offer");
    formData.append("file", uploadedFile);

    console.log("Request formData:", formData);

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("Access token not found");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/v1/images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Fetch error:", result);
        setError(result.message || "Error uploading image");
        setStatus("error");
      } else {
        console.log("Fetch successful, returning result:", result);
        setStatus("success");
      }
    } catch (fetchError) {
      console.error("Network error:", fetchError);
      setError("Network error");
      setStatus("error");
    }
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
              type="button"
              name="Remove Image"
            />
          </ButtonWrapper>
        </>
      )}
      {status === "error" && <p style={{ color: "red" }}>{error}</p>}
    </UploadWrapper>
  );
}

export default ImageUpload;
