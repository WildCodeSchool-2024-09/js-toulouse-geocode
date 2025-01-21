import { useCallback, useEffect, useState } from "react";
import ArticlePersonalInfo from "./ArticlePersonalInfo";
import ProfilePhoto from "./ProfilePhoto";

import "../styles/ProfileInfo.css";
import ModifyProfileInfos from "./ModifyProfileInfos";

export default function ProfileInfo() {
  const user = {
    lastName: "Righi",
    firstName: "Cédric",
    sex: "Masculin",
    birthday: "27/03/2004",
    email: "cedric.righi@gmail.com",
    postalcode: "09120",
    city: "Varilhes",
  };

  const userArr = [
    [user.lastName, user.firstName],
    [user.sex, user.birthday],
    [user.email],
    [user.postalcode, user.city],
  ];

  const [photoFileUrl, setPhotoFileUrl] = useState<string | null>(null);
  const [isModifyingProfile, setIsModifyingProfile] = useState(false);

  const fetchPhoto = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/get-photo/:id`,
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
    <>
      <div className="profile-info-container">
        <ProfilePhoto
          photoFileUrl={photoFileUrl}
          setPhotoFileUrl={setPhotoFileUrl}
          fetchPhoto={fetchPhoto}
        />
        <section className="personal-infos-container">
          {userArr.map((item) => (
            <ArticlePersonalInfo key={userArr.indexOf(item)} infos={item} />
          ))}
          <div className="user-profile-buttons">
            <button
              type="button"
              className="modify-profile-button"
              onClick={() => setIsModifyingProfile(true)}
            >
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
      {isModifyingProfile && (
        <ModifyProfileInfos
          setIsModifyingProfile={setIsModifyingProfile}
          user={user}
        />
      )}
    </>
  );
}
