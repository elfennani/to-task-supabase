import { createBrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Layout from "./MainLayout";
import CategoriesPage from "./pages/CategoriesPage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Task from "./pages/Task";
import TaskPageLayout from "./TaskPageLayout";

export default createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,

        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/categories",
                element: <CategoriesPage />,
            },
        ],
    },
    {
        path: "/task/:id",
        element: <TaskPageLayout />,
        children: [
            {
                index: true,
                element: <Task />,
            },
        ],
    },
]);
