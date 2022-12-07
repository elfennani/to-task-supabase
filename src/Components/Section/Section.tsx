import styles from "./Section.module.scss";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
    title: string;
    children?: any | any[];
    card?: boolean;
    className?: string;
    sectionClassName?: string;
    subtitle?: string;
    isList?: boolean;
};

function index({
    title,
    children,
    card = false,
    className,
    sectionClassName,
    subtitle,
    isList = false,
}: Props) {
    const [listRef] = useAutoAnimate();

    return (
        <section className={`${styles.section} ${sectionClassName || ""}`}>
            <h2>
                {title}
                {subtitle && (
                    <>
                        {" "}
                        <span className={styles.subtitle}>{subtitle}</span>
                    </>
                )}
            </h2>
            {isList ? (
                <ul
                    ref={listRef as any}
                    className={`${className || ""} ${card ? styles.card : ""} ${
                        styles.list
                    }`}
                >
                    {children}
                </ul>
            ) : (
                <div
                    className={`${className || ""} ${card ? styles.card : ""}`}
                >
                    {children}
                </div>
            )}
        </section>
    );
}

export default index;
