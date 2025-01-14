export default function FormConnexionAdmin() {
  return (
    <form>
      <label htmlFor="email-connection-admin">Email</label>
      <input type="email" id="email-connection-admin" />
      <label htmlFor="password-connection-admin">Mot de passe</label>
      <input type="password" id="password-connection-admin" />
      <button type="button">Se connecter</button>
    </form>
  );
}
