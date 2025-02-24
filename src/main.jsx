import { createRoot } from "react-dom/client";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { router } from "./routes/links";
import { RouterProvider } from "react-router-dom";
import ContextApi from "./Context/orderContext";
import { ToastContainer } from "react-toastify";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <ContextApi>
      <ToastContainer />

      <RouterProvider router={router} />
    </ContextApi>
  </ClerkProvider>
);
