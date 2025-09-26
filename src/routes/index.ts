import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import ProtectedTextInput from "./ProtectedTextInput";
import About from "@/pages/pages/About";
import Features from "@/pages/pages/Features";
import Contact from "@/pages/pages/Contact";
import ProtectedProfile from "./ProtectedProfile";
import ProtectedHistory from "./ProtectedHistory";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/text-response",
        Component: ProtectedTextInput,
      },
      {
        path: "/profile",
        Component: ProtectedProfile,
      },
      {
        path: "/history",
        Component: ProtectedHistory,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/features",
        Component: Features,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
    ],
  },
]);