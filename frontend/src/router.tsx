import { createBrowserRouter } from "react-router-dom";
import App from "./pages/AppPage";
import ProjectStepPage from "./pages/ProjectStepPage";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/step", element: <ProjectStepPage /> },
]);

export default router;
