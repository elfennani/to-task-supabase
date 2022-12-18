import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./MainLayout";
import Home from "./pages/Home";
import CategoriesPage from "./pages/CategoriesPage";
import TaskPageLayout from "./TaskPageLayout";
import Task from "./pages/TaskPage";
import { useEffect, useState } from "react";
import Providers from "./Providers/Providers";
import LoginPage from "./pages/LoginPage";
import supabase from "./supabase";
import { Session, User } from "@supabase/supabase-js";

function App() {
    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth
            .getSession()
            .then(({ data, error }) => {
                setUser(data.session?.user ?? null);
            })
            .finally(() => setLoading(false));

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return subscription.unsubscribe;
    }, []);

    if (loading) return <div>Loading</div>;

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={user ? <Providers /> : <Navigate to={"/login"} />}
                >
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="categories" element={<CategoriesPage />} />
                    </Route>
                    <Route path="/task/:id" element={<TaskPageLayout />}>
                        <Route index element={<Task />} />
                    </Route>
                </Route>
                <Route
                    path="/login"
                    element={!user ? <LoginPage /> : <Navigate to={"/"} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
