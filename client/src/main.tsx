// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import AppAdmin from "./admin/AppAdmin";
import AdminPageContainer from "./admin/components/AdminPageContainer";
import ConnectionAdminPage from "./admin/pages/ConnectionAdminPage";
import StationPage from "./admin/pages/StationPage";
import UploadSationsPage from "./admin/pages/UploadSationsPage";
import UsersPage from "./admin/pages/UsersPage";
import VehiclePage from "./admin/pages/VehiclePage";
import FirstWelcomeScreen from "./components/FirstWelcomeScreen";
import GetStartedScreen from "./components/GetStartedScreen";
import SecondWelcomeScreen from "./components/SecondWelcomeScreen";
import UserPageContainer from "./components/UserPageContainer";
import GlobalContext from "./contexts/GlobalContext";
import ContactPage from "./pages/ContactPage";
import GeoMapPage from "./pages/GeoMapPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter(
  [
    {
      element: <App />, // Renders the App component for the home page
      children: [
        {
          path: "/",
          element: <FirstWelcomeScreen />,
        },
        {
          path: "/map",
          element: <GeoMapPage />,
        },
        {
          path: "/user",
          element: <UserPageContainer>{<UserPage />}</UserPageContainer>,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/welcome2",
          element: <SecondWelcomeScreen />,
        },
        {
          path: "/get-started",
          element: <GetStartedScreen />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
    {
      element: <AppAdmin />,
      children: [
        {
          path: "/admin/login",
          element: <ConnectionAdminPage />,
        },
        {
          path: "/admin",
          element: <AdminPageContainer>{<StationPage />}</AdminPageContainer>,
        },
        {
          path: "/admin/users",
          element: <AdminPageContainer>{<UsersPage />}</AdminPageContainer>,
        },
        {
          path: "/admin/stations",
          element: <AdminPageContainer>{<StationPage />}</AdminPageContainer>,
        },
        {
          path: "/admin/vehicles",
          element: <AdminPageContainer>{<VehiclePage />}</AdminPageContainer>,
        },
        {
          path: "/admin/upload",
          element: (
            <AdminPageContainer>{<UploadSationsPage />}</AdminPageContainer>
          ),
        },
      ],
    },
  ],
  // Try adding a new route! For example, "/about" with an About component
);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <GlobalContext>
      <RouterProvider router={router} />
    </GlobalContext>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
