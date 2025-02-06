import { useEffect, useState } from "react";
import DragAndDrop from "../components/DragAndDrop";
import HeaderAdminPage from "../components/HeaderAdminPage";
import "../styles/UploadSationsPage.css";
import useWebSocket from "react-use-websocket";
import ProgressBar from "../components/ProgressBar";
import { useShowNav } from "../contexts/ShowNavProvider";

interface ProgressBarValueType {
  value: number;
  max: number;
}

export default function UploadSationsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [progressBarValue, setProgressBarValue] =
    useState<ProgressBarValueType | null>(null);
  const { setNavVisible } = useShowNav();

  const { lastMessage } = useWebSocket(
    `${import.meta.env.VITE_API_WS_URL}/api/ws`,
  );

  useEffect(() => {
    if (lastMessage) {
      const lastMessageData = JSON.parse(lastMessage?.data);
      setProgressBarValue(lastMessageData);
      if (lastMessageData.value >= lastMessageData.max) {
        setFile(null);
        setProgressBarValue(null);
        setMessage("La base de données a été mise à jour avec succès");
      }
    }
  }, [lastMessage]);

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
                : message === "La base de données a été mise à jour avec succès"
                  ? "message-success"
                  : ""
            }
          >
            {message}
          </p>
        </section>
        {file && !progressBarValue && (
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
        {progressBarValue && (
          <ProgressBar
            progress={progressBarValue?.value ?? 0}
            max={progressBarValue?.max ?? 100}
          />
        )}
      </div>
    </div>
  );
}
