import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "@/pages/Home/Home";
import TextInput from "@/pages/TextResponse/TextInput";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        path: "/",
      },
      {
        Component: TextInput,
        path: "/text-response",
      },
    ],
  },
]);
