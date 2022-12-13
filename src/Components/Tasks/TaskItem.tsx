import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionsContext from "../../contexts/ActionsContext";
import CategoriesContext from "../../contexts/CategoriesContext";
import { Category, TaskData } from "../../types";
import Categories from "../Categories";
import ImageThumbnail from "./ImageThumbnail";
import TaskActions from "./TaskActions";
import styles from "./Tasks.module.scss";

type Props = {
    task: TaskData;
};

const TaskItem = ({ task }: Props) => {
    const { removeTask, toggleStatus } = useContext(ActionsContext);
    const checked = task.done;
    const navigate = useNavigate();

    return (
        <li
            className={`${styles.taskItem}  ${checked ? styles.checked : ""}`}
            onClick={() => navigate(`/task/${task.id}`)}
        >
            <TaskActions
                checked={checked}
                onToggle={() => toggleStatus(task.id)}
                onRemove={() => removeTask(task.id)}
            />

            <div className={`${styles.content}`}>
                <p>{task.title}</p>
                <Categories ids={task.categories} showEmpty />
            </div>
            {!!task.images.length && <ImageThumbnail images={task.images} />}
        </li>
    );
};

export default TaskItem;
