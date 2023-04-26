import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProjectStepPage from "./pages/ProjectStepPage";
import InputSection1 from "@components/CreateProject/RightSection/InputSection1";
import InputSection2 from "@components/CreateProject/RightSection/InputSection2";
import InputSection3 from "@components/CreateProject/RightSection/InputSection3";
import InputSection4 from "@components/CreateProject/RightSection/InputSection4";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    path: "/step",
    element: <ProjectStepPage />,
    children: [
      { path: "1", element: <InputSection1 />, index: true },
      { path: "2", element: <InputSection2 /> },
      { path: "3", element: <InputSection3 /> },
      { path: "4", element: <InputSection4 /> },
    ],
  },
]);

export default router;
