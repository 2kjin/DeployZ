import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ItemListMain from "@/components/item/ItemListMain";
import ProjectItemPage from "./pages/ProjectItemPage";
import IntroPage from "./pages/IntroPage";
import ProjectStepPage from "./pages/ProjectStepPage";
import ItemDetail from "@components/item/ItemDetail";
import Page404 from "./pages/Page404";
import Additional from "./pages/Auth/AdditionalPage";
import OauthLogin from "@components/Auth/OauthLogin";
import OauthSignup from "@components/Auth/OauthSignup";
import InfraGuidePage from "./pages/InfraGuidePage";
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/intro", element: <IntroPage /> },
  { path: "/infraguide", element: <InfraGuidePage /> },
  { path: "/step", element: <ProjectStepPage /> },
  { path: "/project", element: <ProjectItemPage /> },
  { path: "/project/detail/:idx", element: <ItemListMain /> },
  { path: "/item/detail/:idx", element: <ItemDetail /> },

  { path: "/additional", element: <Additional /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/login", element: <LoginPage /> },

  { path: "/loginRedirect", element: <OauthLogin /> },
  { path: "/signupRedirect", element: <OauthSignup /> },
  { path: "*", element: <Page404 /> },
  ,
]);

export default router;
