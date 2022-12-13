import "./App.css";
import Header from "./Components/Header";
import AddTask from "./Components/AddTask";
import Tasks from "./Components/Tasks";
import TasksProvider from "./Providers/TasksProvider";
import CategoriesProvider from "./Providers/CategoriesProvider";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
    return (
        <TasksProvider>
            <CategoriesProvider>
                <RouterProvider router={router} />
            </CategoriesProvider>
        </TasksProvider>
    );
}

/*
<div className="container">
    <AddTask />
    <Tasks />
</div>
*/

export default App;
