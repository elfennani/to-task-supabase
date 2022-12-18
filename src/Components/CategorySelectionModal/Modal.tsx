import {
    BorderOutlined,
    CheckOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useContext, useState } from "react";
import CategoriesActionsContext from "../../contexts/CategoriesActionsContext";
import CategoriesContext from "../../contexts/CategoriesContext";
import CategoryInput from "./CategoryInput";
import styles from "./Modal.module.scss";

type Props = {
    onClose: () => void;
    onConfirm: (ids: number[]) => void;
    selectedCats: number[];
};

const Modal = (props: Props) => {
    const [ids, setIds] = useState<Set<number>>(new Set(props.selectedCats));
    const cats = useContext(CategoriesContext);
    const { remove, add } = useContext(CategoriesActionsContext);
    const [ref] = useAutoAnimate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIds((ids) => {
            const tempSet = new Set(ids);

            const checkboxId = Number(e.target.value);

            if (ids.has(checkboxId)) {
                tempSet.delete(checkboxId);
                return tempSet;
            }

            tempSet.add(checkboxId);

            return tempSet;
        });
    };

    const removeCatHandler = (uuid: number) => {
        setIds((ids) => {
            const temp = new Set(ids);
            temp.delete(uuid);
            return temp;
        });
        remove(uuid);
    };

    const addCatHandler = (e: any) => {
        const value = e.target.value;
        if (e.key == "Enter")
            add({
                colorDegree: 225,
                name: value,
            });
    };

    return (
        <div className={styles.backdrop} onClick={props.onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h1>Choose task categories</h1>
                <ul className={styles.content} ref={ref as any}>
                    {cats.map((cat) => {
                        const checked = ids.has(cat.uuid);
                        return (
                            <li key={cat.uuid}>
                                <label
                                    className={checked ? styles.checked : ""}
                                    style={{
                                        backgroundColor: `hsl(${cat.colorDegree}, 91%, 91%)`,
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        name="category"
                                        checked={checked}
                                        value={cat.uuid}
                                        title={cat.name}
                                        onChange={handleChange}
                                    />
                                    <span className="name">{cat.name}</span>
                                    {checked ? (
                                        <CheckOutlined />
                                    ) : (
                                        <span className={styles.uncheckIcon}>
                                            <BorderOutlined />
                                        </span>
                                    )}
                                    <button
                                        title="remove"
                                        type="button"
                                        onClick={() =>
                                            removeCatHandler(cat.uuid)
                                        }
                                    >
                                        <DeleteOutlined />
                                    </button>
                                </label>
                            </li>
                        );
                    })}
                    <CategoryInput onAdd={add} />
                </ul>
                <footer>
                    <span>
                        {ids.size || "no"}{" "}
                        {ids.size.toString().endsWith("1")
                            ? "category"
                            : "categories"}{" "}
                        selected
                    </span>
                    <button
                        type="button"
                        onClick={() => props.onConfirm([...ids])}
                    >
                        Confirm
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default Modal;
