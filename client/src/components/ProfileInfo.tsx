import { useState } from "react";
import ArticlePersonalInfo from "./ArticlePersonalInfo";
import ProfilePhoto from "./ProfilePhoto";

import "../styles/ProfileInfo.css";

export default function ProfileInfo() {
  const personalInfoList = [
    ["Nom", "Prénom"],
    ["Sexe", "Date de naissance"],
    ["Mail"],
    ["Code postal", "Ville"],
  ];

  const [photoFile, setPhotoFile] = useState<File | string>("");

  return (
    <div className="profile-info-container">
      <ProfilePhoto photoFile={photoFile} setPhotoFile={setPhotoFile} />
      <section className="personal-infos-container">
        {personalInfoList.map((item) => (
          <ArticlePersonalInfo
            key={personalInfoList.indexOf(item)}
            test={item}
          />
        ))}
        <button type="button" className="modify-profile-button">
          Modifier
        </button>
        <button type="button" className="delete-profile-button">
          Supprimer le profil
        </button>
      </section>
    </div>
  );
}
