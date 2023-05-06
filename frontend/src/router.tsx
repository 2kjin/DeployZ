import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ItemListMain from "@/components/item/ItemListMain";
import ProjectItemPage from "./pages/ProjectItemPage";
import IntroPage from "./pages/IntroPage";
import ProjectStepPage from "./pages/ProjectStepPage";
import ItemDetail from "@components/item/ItemDetail";
import Page404 from "./pages/Page404";
import SignupPage from "./pages/SignupPage";
import OauthLogin from "@components/Auth/OauthLogin";
import OauthSignup from "@components/Auth/OauthSignup";
import InfraGuidePage from "./pages/InfraGuidePage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/intro", element: <IntroPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/infraguide", element: <InfraGuidePage /> },
  { path: "/step", element: <ProjectStepPage /> },
  { path: "/project", element: <ProjectItemPage /> },
  { path: "/project/detail/:idx", element: <ItemListMain /> },
  { path: "/item/detail/:idx", element: <ItemDetail /> },

  { path: "/loginRedirect", element: <OauthLogin /> },
  { path: "/signupRedirect", element: <OauthSignup /> },
  { path: "*", element: <Page404 /> },
]);

export default router;
