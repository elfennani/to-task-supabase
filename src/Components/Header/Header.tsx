import styles from "./Header.module.scss";

type Props = {};

const Header = (props: Props) => {
    return (
        <header className={styles.header}>
            <div className="container">
                <h1>
                    To<span className="primary">Task</span>
                </h1>
                <nav>
                    <a href="#" className={styles.active}>
                        All Tasks
                    </a>
                    <a href="#">Grouped</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
