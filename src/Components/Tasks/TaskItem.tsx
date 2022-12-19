import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionsContext from "../../contexts/ActionsContext";
import CategoriesContext from "../../contexts/CategoriesContext";
import useTaskActions from "../../hooks/useTaskActions";
import supabase from "../../supabase";
import { Category, TaskData } from "../../types";
import Categories from "../Categories";
import ImageThumbnail from "./ImageThumbnail";
import TaskActions from "./TaskActions";
import styles from "./Tasks.module.scss";

type Props = {
    task: TaskData;
};

const TaskItem = ({ task }: Props) => {
    const checked = task.done;
    const navigate = useNavigate();
    const { removeTask, toggleStatus } = useTaskActions(task.id);

    return (
        <li
            className={`${styles.taskItem}  ${checked ? styles.checked : ""}`}
            onClick={() => navigate(`/task/${task.id}`)}
        >
            <TaskActions
                checked={checked}
                onToggle={() => toggleStatus(checked)}
                onRemove={() => removeTask()}
            />

            <div className={`${styles.content}`}>
                <p>{task.title}</p>
                <Categories ids={task.categories} showEmpty />
            </div>

            {!!task.images.length && (
                <ImageThumbnail task_id={task.id} images={task.images} />
            )}
        </li>
    );
};

export default TaskItem;
