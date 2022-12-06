import {
    CheckCircleFilled,
    CheckSquareFilled,
    DeleteFilled,
    IeSquareFilled,
    MinusSquareOutlined,
} from "@ant-design/icons";
import styles from "./Tasks.module.scss";

type Props = {
    checked: boolean;
    onToggle(): void;
    onRemove(): void;
};

const TaskActions = (props: Props) => {
    return (
        <div className={styles.actions}>
            <button type="button" title="Uncheck" onClick={props.onToggle}>
                {props.checked ? (
                    <CheckSquareFilled />
                ) : (
                    <MinusSquareOutlined />
                )}
            </button>
            <button type="button" title="Delete Task" onClick={props.onRemove}>
                <DeleteFilled />
            </button>
        </div>
    );
};

export default TaskActions;
