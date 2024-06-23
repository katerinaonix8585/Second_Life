import React, { useState, useEffect } from "react";
import { FaRegImage } from "react-icons/fa";

import Spinner from "components/Spinner/Spinner";
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

interface ImageUploadProps {
  setBaseNamesOfImages: (baseNames: string[]) => void;
  entityType: "offer" | "category" | "user";
  entityId?: number;
  defaultImageUrl?: string;
}

function ImageUpload({
  setBaseNamesOfImages,
  entityType,
  entityId,
  defaultImageUrl,
}: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | undefined>(undefined);
  const [baseName, setBaseName] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (baseName) {
      setBaseNamesOfImages([baseName]);
    } else {
      setBaseNamesOfImages([]);
    }
  }, [baseName, setBaseNamesOfImages]);

  useEffect(() => {
    if (defaultImageUrl) {
      setPreview(defaultImageUrl);
      setShowPreview(true);
    }
  }, [defaultImageUrl]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newFile = event.target.files?.[0];
    if (newFile) {
      setFile(newFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setShowPreview(false);
      };
      reader.readAsDataURL(newFile);
      await handleUploadImage(newFile);
    }
  };

  const handleFileRemove = async () => {
    if (!baseName) {
      setError("Base name not found");
      return;
    }
    setStatus("loading");
    setError(undefined);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("Access token not found");
      setStatus("error");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/v1/images`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ baseName: baseName }),
      });
      if (!response.ok) {
        const result = await response.json();
        console.error("Fetch error:", result);
        setError(result.message || "Error deleting image");
        setStatus("error");
      } else {
        console.log("Image deleted successfully");
        setFile(null);
        setPreview(null);
        setBaseName(null);
        setStatus("idle");
      }
    } catch (fetchError) {
      console.error("Network error:", fetchError);
      setError("Network error");
      setStatus("error");
    }
  };

  const handleUploadImage = async (uploadedFile: File) => {
    setStatus("loading");
    setError(undefined);
    const formData = new FormData();
    formData.append("entityType", entityType);
    if (entityId !== undefined) {
      formData.append("entityId", entityId.toString());
    }
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
        const firstKey = Object.keys(result.values)[0];
        const uploadedImageUrl = result.values[firstKey]["320x320"];
        setPreview(uploadedImageUrl);
        setBaseName(firstKey);
        setStatus("success");
        setShowPreview(true);
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
      {status === "loading" && <Spinner />}
      {preview && showPreview && status === "success" && (
        <Image src={preview} alt="Image preview" />
      )}
      {!preview && defaultImageUrl && (
        <Image src={defaultImageUrl} alt="Default Image" />
      )}
      {status === "success" && (
        <ButtonWrapper>
          <Button
            onButtonClick={handleFileRemove}
            type="button"
            name="Remove Image"
          />
        </ButtonWrapper>
      )}
      {status === "error" && <p style={{ color: "red" }}>{error}</p>}
    </UploadWrapper>
  );
}

export default ImageUpload;
