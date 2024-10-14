import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Units } from "./pages";
import "./index.css";

// import { Database, IndexedDBDatabase } from "./database";
// const db = new Database(new IndexedDBDatabase(indexedDB));

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>404 Not Found</div>,
    children: [
      ...["", "home"].map((name) => ({
        path: name,
        element: <Home />,
      })),
      {
        path: "units",
        element: <Units />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
