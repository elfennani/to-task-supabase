import "./App.css";
import Header from "./Components/Header";
import AddTask from "./Components/AddTask";
import { useState } from "react";
import Tasks from "./Components/Tasks";
import { TaskData } from "./types";
import { v4 as uuidv4 } from "uuid";
import TasksContext from "./contexts/TasksContext";

function App() {
    const [tasks, setTasks] = useState<TaskData[]>([]);

    const addTaskHandler = (task: TaskData) => {
        setTasks((tasks) => [...tasks, task]);
    };

    return (
        <TasksContext.Provider value={tasks}>
            <Header />
            <div className="container">
                <AddTask onAddTask={addTaskHandler} />
                <Tasks />
            </div>
        </TasksContext.Provider>
    );
}

export default App;
