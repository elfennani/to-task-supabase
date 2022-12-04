import { PlusOutlined } from "@ant-design/icons";
import { Category } from "../../types";
import styles from "./Categories.module.scss";

type Props = {
    categories: Category[];
};

const Categories = (props: Props) => {
    return (
        <ul className={styles.cats}>
            {props.categories.map((cat) => (
                <li
                    key={cat.name}
                    style={{
                        backgroundColor: `hsl(${cat.colorDegree}, 91%, 91%)`,
                    }}
                >
                    {cat.name}
                </li>
            ))}
            {/* <li className={styles.add}>
                <PlusOutlined />
            </li> */}
        </ul>
    );
};

export default Categories;
