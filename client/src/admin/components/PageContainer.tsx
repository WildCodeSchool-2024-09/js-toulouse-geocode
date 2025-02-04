import { useAuth } from "../../contexts/AuthProvider";
import ConnectionAdminPage from "../pages/ConnectionAdminPage";

type PageContainerProps = {
  children: React.ReactNode;
};

function PageContainer({ children }: PageContainerProps) {
  const { auth } = useAuth();

  return <>{auth ? children : <ConnectionAdminPage />}</>;
}

export default PageContainer;
