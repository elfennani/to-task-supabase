import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import CategoriesContext from "../../contexts/CategoriesContext";
import { Category } from "../../types";
import styles from "./Categories.module.scss";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CategoryItem from "./CategoryItem";

type Props = {
    ids: string[];
    onAdd?: () => void;
    showEmpty?: boolean;
};

const Categories = (props: Props) => {
    const categories = useContext(CategoriesContext);
    const [autoAnimateRef] = useAutoAnimate();

    const catsData = props.ids
        .map((id) => categories.find((cat) => cat.uuid == id))
        .filter((cat) => !!cat) as Category[];

    return (
        <ul className={styles.cats} ref={autoAnimateRef as any}>
            {catsData.map((cat) => (
                <CategoryItem cat={cat} key={cat.uuid} />
            ))}
            {!catsData.length && props.showEmpty && (
                <li className={styles.uncolored}>Uncategorized</li>
            )}
            {props.onAdd && (
                <li className={styles.add}>
                    <button
                        type="button"
                        title="Add Category"
                        onClick={props.onAdd}
                    >
                        {props.ids && !!props.ids.length ? (
                            <EditOutlined />
                        ) : (
                            <PlusOutlined />
                        )}
                    </button>
                </li>
            )}
        </ul>
    );
};

export default Categories;
