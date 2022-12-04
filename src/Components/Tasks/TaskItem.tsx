import { useState } from "react";
import { Category, TaskData } from "../../types";
import Categories from "../Categories";
import TaskActions from "./TaskActions";
import styles from "./Tasks.module.scss";

type Props = {
    task: TaskData;
};

const TaskItem = ({ task }: Props) => {
    const [checked, setChecked] = useState(false);
    const mockCats: Category[] = [
        {
            name: "Development",
            colorDegree: 233,
        },
        {
            name: "Productivity",
            colorDegree: 125,
        },
    ];
    return (
        <div className={`${styles.taskItem}  ${checked ? styles.checked : ""}`}>
            <TaskActions
                checked={checked}
                onToggle={() => setChecked((c) => !c)}
            />

            <div className={`${styles.content}`}>
                <p>{task.title}</p>
                <Categories categories={mockCats} />
            </div>
        </div>
    );
};

export default TaskItem;
