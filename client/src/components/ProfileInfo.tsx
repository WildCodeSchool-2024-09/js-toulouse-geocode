import DeleteIcon from "/images/delete.svg";
import EmptyProfilePhoto from "/images/empty-profile-photo.png";
import ModifyIcon from "/images/modify.svg";

export default function ProfileInfo() {
  return (
    <div className="profile-info-container">
      <section className="profile-photo-container">
        <img src={EmptyProfilePhoto} alt="default user profile" />
        <div className="photo-buttons">
          <button type="button">
            <img src={ModifyIcon} alt="pp-modify" />
          </button>
          <button type="button">
            <img src={DeleteIcon} alt="pp-delete" />
          </button>
        </div>
      </section>
      <section className="personal-infos-container">
        <article className="name-container">
          <p>Nom</p>
          <p>Prénom</p>
        </article>
        <article className="sex-and-birth-container">
          <p>Sexe</p>
          <p>Date de naissance</p>
        </article>
        <p>Mail</p>
        <article className="location">
          <p>Code postal</p>
          <p>Ville</p>
        </article>
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
