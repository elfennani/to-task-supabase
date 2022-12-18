import React, { ReactElement, useEffect, useMemo, useState } from "react";
import ActionsContext, { Actions } from "../contexts/ActionsContext";
import TasksContext from "../contexts/TasksContext";
import supabase from "../supabase";
import { TaskData } from "../types";

type Props = {
    children: ReactElement | ReactElement[];
};

const TasksProvider = (props: Props) => {
    const [tasks, setTasks] = useState<TaskData[]>([]);

    const addTask = (task: TaskData) => {
        setTasks((tasks) => [...tasks, task]);
    };

    const removeTask = async (uuid: string) => {
        await supabase.from("task_categories").delete().eq("task_id", uuid);
        await supabase.from("tasks").delete().eq("id", uuid);
        loadTasks();
    };

    const toggleStatus = async (uuid: string) => {
        const previousState = tasks.find((task) => task.id == uuid)?.done;
        console.log(previousState);
        if (previousState == undefined) return;

        setTasks((tasks) => {
            return tasks.map((task) =>
                task.id == uuid
                    ? ({ ...task, done: !task.done } as TaskData)
                    : task
            );
        });
        const { error } = await supabase
            .from("tasks")
            .update({
                done: !previousState,
            })
            .eq("id", Number(uuid));

        if (error) {
            setTasks((tasks) => {
                return tasks.map((task) =>
                    task.id == uuid
                        ? ({ ...task, done: previousState } as TaskData)
                        : task
                );
            });
            return;
        }
        loadTasks();
    };

    const loadTasks = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase.from("tasks").select("*");

        if (!data) return;
        const { data: categories } = await supabase
            .from("task_categories")
            .select("*")
            .in(
                "task_id",
                data.map((task) => task.id)
            );
        if (!categories) return;

        setTasks(
            data.map((task) => ({
                id: task.id,
                title: task.title,
                images: [],
                done: task.done,
                dateAdded: task["Date Added"],
                categories: categories
                    .filter((cat) => cat.task_id == task.id)
                    .map((cat) => cat.cat_id),
            }))
        );
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const actions: Actions = {
        addTask,
        removeTask,
        toggleStatus,
        refresh: loadTasks,
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
