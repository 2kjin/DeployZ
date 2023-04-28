import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import App from "./pages/AppPage";
import ItemListPage from "./pages/ItemListPage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectStepPage from "./pages/ProjectStepPage";
import ItemDetail from "@components/item/ItemDetail";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
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
  { path: "/item", element: <ItemListPage /> },
  { path: "/itemdetail/:idx", element: <ItemDetail /> },
]);

export default router;
