import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <div>This is for home component</div> }],
  },
]);

export default router;
