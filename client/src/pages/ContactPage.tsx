import ContactForm from "../components/ContactForm";
import { useShowMenubar } from "../contexts/ShowMenubarProvider";
import "../styles/ContactPage.css";

function ContactPage() {
  const showMenuBarContext = useShowMenubar();
  showMenuBarContext.setShowMenubar(true);

  return (
    <div className="contact-page-container">
      <article>
        <h2>Contact</h2>
        <ContactForm />
      </article>
    </div>
  );
}

export default ContactPage;
