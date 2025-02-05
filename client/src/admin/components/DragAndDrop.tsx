import { DndContext } from "@dnd-kit/core";
import uploadFileImg from "/images/upload-file.svg";
import "../styles/DragAndDrop.css";

interface DragAndDropProps {
  setFile: (file: File | null) => void;
  setMessage: (message: string | null) => void;
}

export default function DragAndDrop({ setFile, setMessage }: DragAndDropProps) {
  return (
    <DndContext>
      <div
        id="dropzone"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          if (event.dataTransfer.files[0].type === "text/csv") {
            setFile(event.dataTransfer.files[0]);
            setMessage(event.dataTransfer.files[0].name);
          } else {
            setFile(null);
            setMessage("Le fichier n'est pas de type CSV");
          }
        }}
      >
        <img
          src={uploadFileImg}
          className="upload-file-img"
          alt="Upload file icon"
        />
        <p>
          Glisser-déposer le fichier ici ou{" "}
          <button
            className="upload-file-button-add-file"
            type="button"
            onClick={() => {
              const fileInput = document.getElementById("fileInput");
              if (fileInput) fileInput.click();
            }}
          >
            choisir le fichier
          </button>
        </p>
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          onChange={(event) => {
            if (
              event.target.files &&
              event.target.files[0].type === "text/csv"
            ) {
              setFile(event.target.files[0]);
              setMessage(event.target.files[0].name);
            } else {
              setFile(null);
              setMessage("Le fichier n'est pas de type CSV");
            }
          }}
        />
      </div>
    </DndContext>
  );
}
