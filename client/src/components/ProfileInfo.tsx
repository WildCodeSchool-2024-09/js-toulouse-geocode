import ArticlePersonalInfo from "./ArticlePersonalInfo";
import ProfilePhoto from "./ProfilePhoto";

export default function ProfileInfo() {
  const personalInfoList = [
    ["Nom", "Prénom"],
    ["Sexe", "Date de naissance"],
    ["Mail"],
    ["Code postal", "Ville"],
  ];

  return (
    <div className="profile-info-container">
      <ProfilePhoto />
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
