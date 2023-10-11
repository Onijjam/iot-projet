import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import PrinterList from "../pages/PrinterList.jsx";
import {InfoPage} from "../pages/InfoPage.jsx";
import LaunchPage from "../pages/LaunchPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <></>,
            },
            {
                path: "/status/:nom",
                element: <InfoPage />,
            },
            {
                path: "/new/:nom",
                element: <LaunchPage />,
            },
        ],
    },
]);

export default router;