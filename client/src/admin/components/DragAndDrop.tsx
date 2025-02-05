import { DndContext } from "@dnd-kit/core";
import uploadFileImg from "/images/upload-file.svg";

export default function DragAndDrop({
  setFile,
}: { setFile: (file: File | null) => void }) {
  return (
    <DndContext>
      <div
        id="dropzone"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          if (event.dataTransfer.files[0].type === "text/csv") {
            setFile(event.dataTransfer.files[0]);
          } else {
            alert("Le fichier doit être de type CSV");
          }
        }}
      >
        <img
          src={uploadFileImg}
          className="vector-img"
          alt="Upload file icon"
        />
        <p>
          Glisser-déposer le fichier ici ou{" "}
          <button
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
            } else {
              alert("Le fichier doit être de type CSV");
            }
          }}
        />
      </div>
    </DndContext>
  );
}
