import React from "react";
import Header from "../Components/Header";

type Props = {};

const NotFound = (props: Props) => {
    return (
        <>
            <Header />
            <center>
                <h1>Well :|</h1>
                <p>
                    It's the almighty <span style={{ color: "red" }}>404</span>{" "}
                    error {">:("}
                </p>
            </center>
        </>
    );
};

export default NotFound;
