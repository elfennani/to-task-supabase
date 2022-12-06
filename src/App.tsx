import "./App.css";
import Header from "./Components/Header";
import AddTask from "./Components/AddTask";
import Tasks from "./Components/Tasks";
import TasksProvider from "./Providers/TasksProvider";
import CategoriesProvider from "./Providers/CategoriesProvider";

function App() {
    return (
        <TasksProvider>
            <CategoriesProvider>
                <Header />
                <div className="container">
                    <AddTask />
                    <Tasks />
                </div>
            </CategoriesProvider>
        </TasksProvider>
    );
}

export default App;
