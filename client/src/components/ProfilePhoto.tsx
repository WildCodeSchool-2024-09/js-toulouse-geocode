import { useState } from "react";
import CancelPhotoButton from "/images/cancel-photo-button.svg";
import ConfirmPhotoButton from "/images/confirm-photo-button.svg";
import DeleteIcon from "/images/delete.svg";
import EmptyProfilePhoto from "/images/empty-profile-photo.png";
import ModifyIcon from "/images/modify.svg";

import "../styles/ProfilePhoto.css";
import ConfirmationDeletePhoto from "./ConfirmationDeletePhoto";
import ConfirmationUploadPhoto from "./ConfirmationUploadPhoto";

interface ProfilePhotoProps {
  photoFileUrl: string | null;
  setPhotoFileUrl: React.Dispatch<React.SetStateAction<string | null>>;
  fetchPhoto: () => void;
}

export default function ProfilePhoto({
  photoFileUrl,
  setPhotoFileUrl,
  fetchPhoto,
}: ProfilePhotoProps) {
  const [isModifyingPhoto, setIsModifyingPhoto] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [initialPhotoUrl, setInitialPhotoUrl] = useState<string | null>(null);

  const [showUploadConfirmation, setShowUploadConfirmation] =
    useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
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
      handlePhotoDelete();
      setPhotoFileUrl(URL.createObjectURL(photoFile));
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
      if (selectedFile) {
        setPhotoFileUrl(URL.createObjectURL(selectedFile));
      }
    }
  };

  const uploadPhotoFetch = async (photoFile: File) => {
    const formData = new FormData();
    formData.append("photo", photoFile as Blob);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload-photo/1`,
        {
          method: "PUT",
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      fetchPhoto();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhotoDelete = () => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/api/delete-photo/1`, {
        method: "DELETE",
      });
      setPhotoFileUrl(null);
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
      {showDeleteConfirmation && (
        <ConfirmationDeletePhoto
          setShowDeleteConfirmation={setShowDeleteConfirmation}
          handlePhotoDelete={handlePhotoDelete}
        />
      )}
      <img
        src={photoFileUrl ? photoFileUrl : EmptyProfilePhoto}
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
          e.target.value = "";
        }}
      />
      <div className="photo-buttons">
        <button
          type="button"
          onClick={() => {
            setInitialPhotoUrl(photoFileUrl);
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
            <img src={ConfirmPhotoButton} alt="pp-confirm" />
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            if (isModifyingPhoto) {
              setPhotoFileUrl(initialPhotoUrl);
            } else {
              setShowDeleteConfirmation(true);
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
