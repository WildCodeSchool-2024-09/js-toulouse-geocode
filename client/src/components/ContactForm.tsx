function ContactForm() {
  return (
    <section>
      <h3>
        Un renseignement?
        <br />
        Nous rejoindre en tant que partenaire?
      </h3>
      <form
        action={`${import.meta.env.VITE_API_URL}/api/contacts`}
        method="post"
      >
        <select name="ask-type">
          <option value="info">Demande d'informations</option>
          <option value="partnership">Demande de partenariat</option>
          <option value="other">Autres</option>
        </select>
        <input type="text" placeholder="Nom*" name="name" />
        <input type="email" placeholder="Email*" name="email" />
        <textarea placeholder="Message*" name="message" />
        <button type="submit">Envoyer</button>
      </form>
    </section>
  );
}

export default ContactForm;
