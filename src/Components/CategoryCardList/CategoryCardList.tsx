import { useContext } from "react";
import CategoriesContext from "../../contexts/CategoriesContext";
import CategoryCard from "./CategoryCard";
import styles from "./Card.module.scss";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Section from "../Section";

type Props = {};

const CategoryCardList = (props: Props) => {
    const categories = useContext(CategoriesContext);
    const [autoAnimate] = useAutoAnimate();
    return (
        <Section title="My Categories" className={styles.list} isList>
            {categories.map((cat) => (
                <CategoryCard cat={cat} key={cat.uuid} />
            ))}
        </Section>
    );
};

export default CategoryCardList;
