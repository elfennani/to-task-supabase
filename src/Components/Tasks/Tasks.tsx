import { TaskData } from "../../types";
import Section from "../Section";
import TaskItem from "./TaskItem";
import styles from "./Tasks.module.scss";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import TasksContext from "../../contexts/TasksContext";
import { useQuery } from "@tanstack/react-query";
import { loadTasks } from "../../functions";

type Props = {};

const Tasks = (props: Props) => {
    // const tasks = useContext(TasksContext);
    const {
        data: tasks,
        isLoading,
        isError,
        error,
        isRefetching,
    } = useQuery(["tasks"], () => loadTasks());

    if (isError) return <p className="red">{error as any}</p>;

    if (isLoading) return <p>Loading...</p>;

    return (
        <Section
            title="My Tasks"
            sectionClassName={styles.taskContainer}
            className={styles.innerContainer}
            subtitle={`${
                tasks.length
                    ? `${tasks.filter((t) => t.done).length}/${
                          tasks.length
                      } done`
                    : "no tasks to do"
            }${isRefetching ? " refetching" : ""}`}
            isList
        >
            {tasks
                .sort((a, b) => b.dateAdded - a.dateAdded)
                .sort((a, b) => {
                    if (a.done && !b.done) return 1;
                    if (!a.done && b.done) return -1;
                    return 0;
                })
                .map((task) => (
                    <TaskItem task={task} key={task.id} />
                ))}
        </Section>
    );
};

export default Tasks;
