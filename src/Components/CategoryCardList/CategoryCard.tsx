import { useContext, useMemo } from "react";
import TasksContext from "../../contexts/TasksContext";
import { Category } from "../../types";
import styles from "./Card.module.scss";
import Progress from "./Progress";

type Props = {
    cat: Category;
};

const CategoryCard = ({ cat: { uuid, colorDegree, name } }: Props) => {
    const tasks = useContext(TasksContext);

    const isEmpty: boolean = useMemo(
        () => !tasks.filter((task) => task.categories.includes(uuid)).length,
        [tasks]
    );

    if (isEmpty) return <></>;

    return (
        <li className={styles.item}>
            <div
                className={styles.color}
                style={{ backgroundColor: `hsl(${colorDegree}, 91%, 91%)` }}
            ></div>
            <div className={styles.content}>
                <h2>{name}</h2>
                <Progress uuid={uuid} />
            </div>
        </li>
    );
};

export default CategoryCard;
