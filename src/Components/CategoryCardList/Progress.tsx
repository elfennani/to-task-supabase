import { useContext, useMemo } from "react";
import TasksContext from "../../contexts/TasksContext";
import styles from "./Card.module.scss";

type Props = {
    uuid: string;
};

const Progress = ({ uuid }: Props) => {
    const tasks = useContext(TasksContext);

    const [done, total] = useMemo(() => {
        const filteredTasks = tasks.filter((task) =>
            task.categories.includes(uuid)
        );

        const done = filteredTasks.filter((task) => task.done).length;
        const total = filteredTasks.length;

        return [done, total];
    }, [tasks]);

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
