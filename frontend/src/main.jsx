import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./pages/auth";
import "./index.css";
import Booking from "./pages/Booking/booking.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import RoomPage from "./pages/RoomPage/RoomPage.jsx";
import Admin from "./pages/Admin/index.jsx";


const router = createBrowserRouter([
    {
        path: "/auth",
        element: <Auth />,
    },
    {
        path: "/booking",
        element: <Booking />,
    },
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/room",
        element: <RoomPage />,
    },
    {
        path: '/admin',
        element: <Admin />
    }



]);



const container = document.getElementById("root");

if (container) {
    const root = createRoot(container);

    root.render(
        <StrictMode>
            <HeroUIProvider>
                <RouterProvider router={router}  />
            </HeroUIProvider>
        </StrictMode>
    );
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document."
    );
}