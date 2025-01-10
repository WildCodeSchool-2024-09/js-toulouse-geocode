import { useShowMenubar } from "../contexts/ShowMenubarProvider";

function ContactPage() {
  const showMenuBarContext = useShowMenubar();
  showMenuBarContext.setShowMenubar(true);

  return (
    <div>
      <h1>Welcome to the Contact Page</h1>
      <p>This is the contact page content.</p>
    </div>
  );
}

export default ContactPage;
