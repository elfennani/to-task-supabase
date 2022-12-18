import { Outlet } from "react-router-dom";
import AddTask from "./Components/AddTask";
import Header from "./Components/Header";
import supabase from "./supabase";

type Props = {};

function Layout({}: Props) {
    const logOutHandler = async () => {
        await supabase.auth.signOut();
    };
    return (
        <>
            <Header />
            <div className="container">
                <AddTask />
                <Outlet />
                <button onClick={logOutHandler}>Logout</button>
            </div>
        </>
    );
}

export default Layout;
