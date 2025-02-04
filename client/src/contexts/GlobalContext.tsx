import ShowModalProvider from "../admin/contexts/ShowModalProvider";
import ShowNavProvider from "../admin/contexts/ShowNavProvider";
import AuthProvider from "./AuthProvider";
import { GeoPositionContextProvider } from "./GeoPositionContextProvider";
import RefreshProvider from "./RefreshProvider";
import { ShowMenubarProvider } from "./ShowMenubarProvider";
import { StationsLocationsContextProvider } from "./StationsLocationsContextProvider";

export default function GlobalContext({
  children,
}: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <GeoPositionContextProvider>
        <ShowMenubarProvider>
          <ShowNavProvider>
            <StationsLocationsContextProvider>
              <ShowModalProvider>
                <RefreshProvider>{children}</RefreshProvider>
              </ShowModalProvider>
            </StationsLocationsContextProvider>
          </ShowNavProvider>
        </ShowMenubarProvider>
      </GeoPositionContextProvider>
    </AuthProvider>
  );
}
