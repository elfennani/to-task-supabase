import "./App.css";
import Header from "./Components/Header";
import AddTask from "./Components/AddTask";
import { useState } from "react";
import Tasks from "./Components/Tasks";
import { TaskData } from "./types";
import { v4 as uuidv4 } from "uuid";
import TasksContext from "./contexts/TasksContext";
import TasksProvider from "./Providers/TasksProvider";

function App() {
    return (
        <TasksProvider>
            <Header />
            <div className="container">
                <AddTask />
                <Tasks />
            </div>
        </TasksProvider>
    );
}

export default App;
