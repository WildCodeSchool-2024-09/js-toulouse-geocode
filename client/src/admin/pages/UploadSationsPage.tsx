import { useEffect, useState } from "react";
import DragAndDrop from "../components/DragAndDrop";
import HeaderAdminPage from "../components/HeaderAdminPage";
import "../styles/UploadSationsPage.css";
import { useShowNav } from "../contexts/ShowNavProvider";

export default function UploadSationsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { setNavVisible } = useShowNav();

  const updateDatabase = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/csv`, {
        method: "POST",
        body: formData,
        headers: {},
      });

      if (!response.ok) {
        throw new Error(`Erreur du serveur: ${response.statusText}`);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la base de données :",
        error,
      );
    }
  };

  useEffect(() => {
    setNavVisible(true);
  }, [setNavVisible]);

  return (
    <div className="upload-page-container">
      <HeaderAdminPage title="Mise a jour des bornes" />
      <div className="upload-page-drap-and-drop-container">
        <h2>Upload file</h2>
        <DragAndDrop setFile={setFile} setMessage={setMessage} />
        <section>
          <p>
            Format supporté : <strong>CSV</strong>
          </p>
          <p
            className={
              message === "Le fichier n'est pas de type CSV"
                ? "message-error"
                : ""
            }
          >
            {message}
          </p>
        </section>
        {file && (
          <div className="upload-page-button-container">
            <button
              className="upload-page-button"
              type="button"
              onClick={() => updateDatabase(file)}
            >
              Mettre à jour
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
