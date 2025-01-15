import { useState } from "react";
import CancelPhotoButton from "/images/cancel-photo-button.svg";
import ConfirmPhotoButton from "/images/confirm-photo-button.svg";
import DeleteIcon from "/images/delete.svg";
import EmptyProfilePhoto from "/images/empty-profile-photo.png";
import ModifyIcon from "/images/modify.svg";

import "../styles/ProfilePhoto.css";
import ConfirmationUploadPhoto from "./ConfirmationUploadPhoto";

interface ProfilePhotoProps {
  photoFile: File | string;
  setPhotoFile: React.Dispatch<React.SetStateAction<File | string>>;
}

export default function ProfilePhoto({
  photoFile,
  setPhotoFile,
}: ProfilePhotoProps) {
  const [isModifyingPhoto, setIsModifyingPhoto] = useState(false);
  const [valueInput, setValueInput] = useState<File | undefined | string>(
    photoFile,
  );
  const [initialPhotoFile] = useState<File | string>(photoFile);
  const [showUploadConfirmation, setShowUploadConfirmation] =
    useState<boolean>(false);

  const handleClickModifyPhoto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const fileInput = document.getElementById("photo-input");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleUpload = () => {
    if (photoFile && typeof photoFile !== "string") {
      uploadPhotoFetch(photoFile);
    } else {
      console.error("Aucun fichier à uploader");
    }
  };

  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      if (selectedFile.size > 5 * 1024 * 1024) {
        console.error("Fichier trop volumineux");

        setIsModifyingPhoto(false);
        e.target.value = "";
        return;
      }

      setPhotoFile(selectedFile);
      setValueInput(selectedFile);
    }
  };

  const uploadPhotoFetch = async (photoFile: File) => {
    const formData = new FormData();
    formData.append("photo", photoFile as Blob);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload-photo`,
        {
          method: "POST",
          body: formData,
        },
      );
      if (!response.ok) {
        setPhotoFile("");
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="profile-photo-container">
      {showUploadConfirmation && (
        <ConfirmationUploadPhoto
          setShowUploadConfirmation={setShowUploadConfirmation}
          handleClickModifyPhoto={handleClickModifyPhoto}
          setIsModifyingPhoto={setIsModifyingPhoto}
        />
      )}
      <img
        src={
          typeof photoFile === "string"
            ? EmptyProfilePhoto
            : URL.createObjectURL(photoFile)
        }
        alt="default user profile"
      />
      <input
        id="photo-input"
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .jpeg, .png, .webp"
        onChange={(e) => {
          handleChangePhoto(e);
          setShowUploadConfirmation(false);
        }}
        value={typeof valueInput === "string" ? valueInput : ""}
      />
      <div className="photo-buttons">
        <button
          type="button"
          onClick={() => {
            if (isModifyingPhoto) {
              handleUpload();
              setIsModifyingPhoto(false);
            } else {
              setShowUploadConfirmation(true);
            }
          }}
        >
          {!isModifyingPhoto ? (
            <img src={ModifyIcon} alt="pp-modify" />
          ) : (
            <img src={ConfirmPhotoButton} alt="pp-cancel" />
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            if (isModifyingPhoto) {
              setPhotoFile(initialPhotoFile);
            } else {
              setPhotoFile("");
              setValueInput(undefined);
            }
            setIsModifyingPhoto(false);
          }}
        >
          {isModifyingPhoto ? (
            <img src={CancelPhotoButton} alt="pp-cancel" />
          ) : (
            <img src={DeleteIcon} alt="pp-delete" />
          )}
        </button>
      </div>
    </section>
  );
}
