import DeleteIcon from "/images/delete.svg";
import EmptyProfilePhoto from "/images/empty-profile-photo.png";
import ModifyIcon from "/images/modify.svg";

export default function ProfilePhoto() {
  return (
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
  );
}
