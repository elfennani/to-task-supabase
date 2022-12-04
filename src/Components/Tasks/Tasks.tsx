import { TaskData } from "../../types";
import Section from "../Section";
import TaskItem from "./TaskItem";
import styles from "./Tasks.module.scss";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import TasksContext from "../../contexts/TasksContext";

type Props = {};

const Task = (props: Props) => {
    const tasks = useContext(TasksContext);
    return (
        <Section
            title="My Tasks"
            sectionClassName={styles.taskContainer}
            className={styles.innerContainer}
        >
            {tasks.map((task) => (
                <TaskItem task={task} />
            ))}
        </Section>
    );
};

export default Task;
