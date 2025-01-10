import { useShowMenubar } from "../contexts/ShowMenubarProvider";

function UserPage() {
  const showMenuBarContext = useShowMenubar();
  showMenuBarContext.setShowMenubar(true);

  return (
    <div>
      <h1>Welcome to the User Page</h1>
      <p>This is the user page content.</p>
    </div>
  );
}

export default UserPage;
