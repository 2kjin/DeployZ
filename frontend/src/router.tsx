import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ItemListPage from "./pages/ItemListPage";
import ProjectListPage from "./pages/ProjectListPage";
import IntroPage from "./pages/IntroPage";
import ProjectStepPage from "./pages/ProjectStepPage";
import ItemDetail from "@components/item/ItemDetail";
import ThreejstestPage from "./pages/ThreejstestPage";
import Page404 from "./pages/Page404";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/intro", element: <IntroPage /> },
  {
    path: "/step",
    element: <ProjectStepPage />,
    // children: [
    //   { path: "1", element: <InputSection1 />, index: true },
    //   { path: "2", element: <InputSection2 /> },
    //   { path: "3", element: <InputSection3 /> },
    //   { path: "4", element: <InputSection4 /> },
    // ],
  },
  { path: "/project", element: <ProjectListPage /> },
  { path: "/project/detail/:idx", element: <ItemListPage /> },
  { path: "/item/detail/:idx", element: <ItemDetail /> },
  {
    path: "/test",
    element: <ThreejstestPage />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;
