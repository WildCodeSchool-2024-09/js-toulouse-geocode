import ContactForm from "../components/ContactForm";
import { useShowMenubar } from "../contexts/ShowMenubarProvider";

function ContactPage() {
  const showMenuBarContext = useShowMenubar();
  showMenuBarContext.setShowMenubar(true);

  return (
    <article>
      <h2>Contact</h2>
      <ContactForm />
    </article>
  );
}

export default ContactPage;
