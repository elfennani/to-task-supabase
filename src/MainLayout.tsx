import React from "react";
import { Outlet } from "react-router-dom";
import AddTask from "./Components/AddTask";
import Header from "./Components/Header";
import CategoriesProvider from "./Providers/CategoriesProvider";
import TasksProvider from "./Providers/TasksProvider";

type Props = {};

function Layout({}: Props) {
    return (
        <>
            <Header />
            <div className="container">
                <AddTask />
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
