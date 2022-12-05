import React, { ReactElement, useState } from "react";
import ActionsContext, { Actions } from "../contexts/ActionsContext";
import TasksContext from "../contexts/TasksContext";
import { TaskData } from "../types";

type Props = {
    children: ReactElement | ReactElement[];
};

const TasksProvider = (props: Props) => {
    const [tasks, setTasks] = useState<TaskData[]>([]);

    const addTask = (task: TaskData) => {
        setTasks((tasks) => [...tasks, task]);
    };

    const removeTask = (uuid: string) => {
        setTasks((tasks) => tasks.filter((task) => task.id != uuid));
    };

    const actions: Actions = {
        addTask,
        removeTask,
    };

    return (
        <TasksContext.Provider value={tasks}>
            <ActionsContext.Provider value={actions}>
                {props.children}
            </ActionsContext.Provider>
        </TasksContext.Provider>
    );
};

export default TasksProvider;
