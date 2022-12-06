import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useContext } from "react";
import CategoriesContext from "../../contexts/CategoriesContext";
import { Category } from "../../types";
import styles from "./Categories.module.scss";

type Props = {
    ids: string[];
    onAdd?: () => void;
};

const Categories = (props: Props) => {
    const categories = useContext(CategoriesContext);
    return (
        <ul className={styles.cats}>
            {props.ids
                .map((id) => categories.find((cat) => cat.uuid == id))
                .map((cat) =>
                    cat ? (
                        <li
                            key={cat.uuid}
                            style={{
                                backgroundColor: `hsl(${cat.colorDegree}, 91%, 91%)`,
                            }}
                        >
                            {cat.name}
                        </li>
                    ) : (
                        <></>
                    )
                )}
            {props.onAdd && (
                <li className={styles.add}>
                    <button
                        type="button"
                        title="Add Category"
                        onClick={props.onAdd}
                    >
                        {props.ids.length ? <EditOutlined /> : <PlusOutlined />}
                    </button>
                </li>
            )}
        </ul>
    );
};

export default Categories;
