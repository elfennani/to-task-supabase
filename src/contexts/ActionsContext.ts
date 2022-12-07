import { createContext } from "react";
import { TaskData } from "../types";

export type Actions = {
    addTask: (task: TaskData) => void;
    removeTask: (uuid: string) => void;
    toggleStatus: (uuid: string) => void;
};

export default createContext<Actions>({
    addTask(task) {},
    removeTask(uuid) {},
    toggleStatus(uuid) {},
});
