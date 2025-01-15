import { useState } from "react";

function ContactForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event?.currentTarget;
    form?.classList.add("loading");
    event.preventDefault();
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      form.reset();
      setErrorMessage(
        "Votre message a bien été envoyé. Vous serez contacté prochainement.",
      );
    } else {
      setErrorMessage("Une erreur est survenue, veuillez réessayer plus tard");
    }
  };
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
        onSubmit={handleSubmit}
      >
        <select name="ask_type">
          <option value="info">Demande d'informations</option>
          <option value="partnership">Demande de partenariat</option>
          <option value="other">Autres</option>
        </select>
        <input type="text" placeholder="Nom*" name="name" />
        <input type="email" placeholder="Email*" name="email" />
        <textarea placeholder="Message*" name="message" />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Envoyer</button>
      </form>
    </section>
  );
}

export default ContactForm;
