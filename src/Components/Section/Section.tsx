import styles from "./Section.module.scss";

type Props = {
    title: string;
    children?: any | any[];
    card?: boolean;
    className?: string;
    sectionClassName?: string;
};

function index({
    title,
    children,
    card = false,
    className,
    sectionClassName,
}: Props) {
    return (
        <section className={`${styles.section} ${sectionClassName || ""}`}>
            <h2>{title}</h2>
            <div className={`${className || ""} ${card ? styles.card : ""}`}>
                {children}
            </div>
        </section>
    );
}

export default index;
