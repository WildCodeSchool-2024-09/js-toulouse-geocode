import { useCallback, useEffect, useState } from "react";
import ArticlePersonalInfo from "./ArticlePersonalInfo";
import ProfilePhoto from "./ProfilePhoto";

import "../styles/ProfileInfo.css";
import { useAuth } from "../contexts/AuthProvider";
import ConfirmationDeleteProfile from "./ConfirmationDeleteProfile";
import ModifyProfileInfos from "./ModifyProfileInfos";

export default function ProfileInfo() {
  interface User {
    birthday: string;
    firstname: string;
    hashed_password: string;
    id: number;
    lastname: string;
    mail: string;
    number_of_vehicle: number;
    postal_code_id: number;
    insee_code_id: number;
    sex: string;
  }

  const { auth } = useAuth();
  const [userArr, setUserArr] = useState<string[][]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [photoFileUrl, setPhotoFileUrl] = useState<string | null>(null);
  const [isModifyingProfile, setIsModifyingProfile] = useState(false);
  const [isDeletingProfile, setIsDeletingProfile] = useState(false);
  const [postalcode, setPostalcode] = useState<number | null>(null);

  const getProfileInfos = useCallback(async () => {
    try {
      const userResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${auth?.user_id}`,
      );
      const userData = await userResponse.json();

      const [postalcodeData, inseeCodeData] = await Promise.all([
        fetch(
          `${import.meta.env.VITE_API_URL}/api/postalcodes/${userData.postal_code_id}`,
        ).then((res) => res.json()),
        fetch(
          `${import.meta.env.VITE_API_URL}/api/inseecode/${userData.insee_code_id}`,
        ).then((res) => res.json()),
      ]);

      const cityResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cities/${inseeCodeData.city_id}`,
      );
      const cityData = await cityResponse.json();

      setPostalcode(postalcodeData.code);
      setUser(userData);

      const birthdayDate = new Date(userData.birthday);
      const birthdayCorrectFormat = `${birthdayDate.getDate().toString().padStart(2, "0")}/${(birthdayDate.getMonth() + 1).toString().padStart(2, "0")}/${birthdayDate.getFullYear()}`;

      setUserArr([
        [userData.lastname ?? "", userData.firstname ?? ""],
        [userData.sex ?? "", birthdayCorrectFormat ?? ""],
        [userData.mail ?? ""],
        [postalcodeData.code ?? "", cityData.name ?? ""],
      ]);
    } catch (error) {
      console.error(error);
    }
  }, [auth?.user_id]);

  useEffect(() => {
    getProfileInfos();
  }, [getProfileInfos]);

  const fetchPhoto = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/get-photo/${auth?.user_id}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setPhotoFileUrl(data.url);
    } catch (error) {
      console.error(error);
    }
  }, [auth]);

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
            <button
              type="button"
              className="delete-profile-button"
              onClick={() => setIsDeletingProfile(true)}
            >
              Supprimer le profil
            </button>
          </div>
        </section>
      </div>
      {isModifyingProfile && user && (
        <ModifyProfileInfos
          setIsModifyingProfile={setIsModifyingProfile}
          user={user}
          city={userArr[3][1]}
          getUser={getProfileInfos}
          postalcode={postalcode}
        />
      )}
      {isDeletingProfile && user && (
        <ConfirmationDeleteProfile
          setIsDeletingProfile={setIsDeletingProfile}
        />
      )}
    </>
  );
}
