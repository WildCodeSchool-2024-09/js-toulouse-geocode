import DeleteIcon from "/images/delete.svg";
import EmptyProfilePhoto from "/images/empty-profile-photo.png";
import ModifyIcon from "/images/modify.svg";

export default function ProfileInfo() {
  return (
    <div className="profile-info-container">
      <div className="profile-photo-container">
        <img src={EmptyProfilePhoto} alt="default user profile" />
        <div className="photo-butons">
          <button type="button">
            <img src={ModifyIcon} alt="pp-modify" />
          </button>
          <button type="button">
            <img src={DeleteIcon} alt="pp-delete" />
          </button>
        </div>
      </div>
      <div className="personal-infos-container">
        <div className="name-container">
          <p>Nom</p>
          <p>Prénom</p>
        </div>
        <div className="sex-and-birth-container">
          <p>Sexe</p>
          <p>Date de naissance</p>
        </div>
        <p>Mail</p>
        <div className="location">
          <p>Code postal</p>
          <p>Ville</p>
        </div>
      </div>
      <div className="edit-profile-buttons">
        <button type="button" className="modify-profile-button">
          Modifier
        </button>
        <button type="button" className="delete-profile-button">
          Supprimer le profil
        </button>
      </div>
    </div>
  );
}
