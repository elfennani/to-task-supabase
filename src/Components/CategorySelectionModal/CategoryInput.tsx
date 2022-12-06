import React, { useState } from "react";
import { Category } from "../../types";
import styles from "./Modal.module.scss";

type Props = {
    onAdd: (cat: Category) => void;
};

const CategoryInput = (props: Props) => {
    const [degree, setDegree] = useState(1);
    const [name, setName] = useState("");

    const addCatHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            props.onAdd({
                uuid: "",
                colorDegree: degree,
                name: name,
            });
            setName("");
            setDegree(1);
        }
    };

    return (
        <div className={styles.catInput}>
            <input
                type="text"
                placeholder="Add Category"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={addCatHandler}
                style={{
                    backgroundColor: `hsl(${degree}, 91%, 91%)`,
                }}
            />
            <input
                type="range"
                min="1"
                max="360"
                title="color degree"
                value={degree}
                onChange={(e) => setDegree(+e.target.value)}
            />
        </div>
    );
};

export default CategoryInput;
