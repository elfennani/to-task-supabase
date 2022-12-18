import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Outlet } from "react-router-dom";
import CategoriesProvider from "./CategoriesProvider";
import TasksProvider from "./TasksProvider";

type Props = {};

const client = new QueryClient();

const Providers = (props: Props) => {
    return (
        <QueryClientProvider client={client}>
            <CategoriesProvider>
                <Outlet />
            </CategoriesProvider>
        </QueryClientProvider>
    );
};

export default Providers;
