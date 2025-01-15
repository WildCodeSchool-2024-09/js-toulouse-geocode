import { useState } from "react";
import ArticlePersonalInfo from "./ArticlePersonalInfo";
import ProfilePhoto from "./ProfilePhoto";

import "../styles/ProfileInfo.css";

export default function ProfileInfo() {
  const personalInfoList = [
    ["Righi", "Cédric"],
    ["Masculin", "27/03/2004"],
    ["cedric.righi@gmail.com"],
    ["09120", "Varilhes"],
  ];

  const [photoFile, setPhotoFile] = useState<File | string>("");

  return (
    <div className="profile-info-container">
      <ProfilePhoto photoFile={photoFile} setPhotoFile={setPhotoFile} />
      <section className="personal-infos-container">
        {personalInfoList.map((item) => (
          <ArticlePersonalInfo
            key={personalInfoList.indexOf(item)}
            infos={item}
          />
        ))}
        <div className="user-profile-buttons">
          <button type="button" className="modify-profile-button">
            Modifier
          </button>
          <button type="button" className="disconnect-profile-button">
            Se déconnecter
          </button>
          <button type="button" className="delete-profile-button">
            Supprimer le profil
          </button>
        </div>
      </section>
    </div>
  );
}
