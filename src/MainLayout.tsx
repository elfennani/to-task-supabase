import { Outlet } from "react-router-dom";
import Account from "./Components/Account";
import AddTask from "./Components/AddTask";
import Header from "./Components/Header";
import supabase from "./supabase";

type Props = {};

function Layout({}: Props) {
    return (
        <>
            <Header />
            <div className="container">
                <AddTask />
                <Outlet />
                <Account />
            </div>
        </>
    );
}

export default Layout;
