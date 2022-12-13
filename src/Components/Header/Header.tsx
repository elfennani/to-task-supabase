import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

type Props = {};

const Header = (props: Props) => {
    return (
        <header className={styles.header}>
            <div className="container">
                <h1>
                    <NavLink to={"/"}>
                        To<span className="primary">Task</span>
                    </NavLink>
                </h1>
                <nav>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? styles.active : undefined
                        }
                    >
                        All Tasks
                    </NavLink>
                    <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                            isActive ? styles.active : undefined
                        }
                    >
                        Grouped
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
