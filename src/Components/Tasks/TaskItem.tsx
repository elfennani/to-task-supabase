import { useContext, useState } from "react";
import ActionsContext from "../../contexts/ActionsContext";
import CategoriesContext from "../../contexts/CategoriesContext";
import { Category, TaskData } from "../../types";
import Categories from "../Categories";
import TaskActions from "./TaskActions";
import styles from "./Tasks.module.scss";

type Props = {
    task: TaskData;
};

const TaskItem = ({ task }: Props) => {
    const [checked, setChecked] = useState(false);
    const { removeTask } = useContext(ActionsContext);
    const categories = useContext(CategoriesContext);

    return (
        <div className={`${styles.taskItem}  ${checked ? styles.checked : ""}`}>
            <TaskActions
                checked={checked}
                onToggle={() => setChecked((c) => !c)}
                onRemove={() => removeTask(task.id)}
            />

            <div className={`${styles.content}`}>
                <p>{task.title}</p>
                <Categories ids={task.categories} />
            </div>
            {task.images && (
                <img src={URL.createObjectURL(task.images[0])} alt="" />
            )}
        </div>
    );
};

export default TaskItem;
