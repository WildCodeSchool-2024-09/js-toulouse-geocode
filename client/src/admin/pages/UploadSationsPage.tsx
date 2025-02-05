import { useState } from "react";
import DragAndDrop from "../components/DragAndDrop";
import HeaderAdminPage from "../components/HeaderAdminPage";

export default function UploadSationsPage() {
  const [file, setFile] = useState<File | null>(null);

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
  return (
    <div className="upload-page-container">
      <HeaderAdminPage title="Mise a jour des bornes" />
      <div className="upload-page-drap-and-drop-container">
        <h2>Upload file</h2>
        <DragAndDrop setFile={setFile} />
        <p>
          Format supporté : <strong>CSV</strong>
        </p>
        {file && (
          <div>
            <p>{file.name}</p>
            <button type="button" onClick={() => updateDatabase(file)}>
              Mettre à jour
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
