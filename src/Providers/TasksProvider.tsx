import React, { ReactElement, useMemo, useState } from "react";
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

    const toggleStatus = (uuid: string) => {
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id == uuid ? { ...task, done: !task.done } : task
            )
        );
    };

    const actions = useMemo<Actions>(
        () => ({
            addTask,
            removeTask,
            toggleStatus,
        }),
        []
    );

    return (
        <TasksContext.Provider value={tasks}>
            <ActionsContext.Provider value={actions}>
                {props.children}
            </ActionsContext.Provider>
        </TasksContext.Provider>
    );
};

export default TasksProvider;
