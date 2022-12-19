import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import TasksContext from "../../contexts/TasksContext";
import { loadTasks } from "../../functions";
import styles from "./Card.module.scss";

type Props = {
    uuid: number;
};

const Progress = ({ uuid }: Props) => {
    const {
        isLoading,
        data: tasks,
        isError,
    } = useQuery(["tasks"], () => loadTasks());

    const [done, total] = useMemo(() => {
        if (!tasks) return [0, 0];
        const filteredTasks = tasks.filter((task) =>
            task.categories.includes(uuid)
        );

        const done = filteredTasks.filter((task) => task.done).length;
        const total = filteredTasks.length;

        return [done, total];
    }, [tasks]);

    if (isLoading) return <>Loading</>;
    if (isError) return <>Error</>;

    return (
        <>
            <span className={styles.done}>
                {done}/{total} Completed
            </span>
            <div className={styles.progress}>
                <div style={{ width: `${(done / total) * 100}%` }}></div>
            </div>
        </>
    );
};

export default Progress;
