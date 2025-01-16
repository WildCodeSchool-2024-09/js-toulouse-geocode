import { useCallback, useEffect, useState } from "react";
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

  const [photoFileUrl, setPhotoFileUrl] = useState<string | null>(null);

  const fetchPhoto = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/get-photo/1`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setPhotoFileUrl(data.url);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchPhoto();
  }, [fetchPhoto]);

  return (
    <div className="profile-info-container">
      <ProfilePhoto
        photoFileUrl={photoFileUrl}
        setPhotoFileUrl={setPhotoFileUrl}
        fetchPhoto={fetchPhoto}
      />
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
