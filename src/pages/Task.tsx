import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
    useRoutes,
    useSearchParams,
} from "react-router-dom";
import TaskItem from "../Components/Tasks/TaskItem";
import TasksContext from "../contexts/TasksContext";
import styled from "styled-components";
import Categories from "../Components/Categories";
import {
    CheckSquareFilled,
    DeleteFilled,
    EditFilled,
    MinusSquareOutlined,
} from "@ant-design/icons";
import ActionsContext from "../contexts/ActionsContext";
import ImageList from "../Components/ImageList";
import { Portal } from "react-portal";

type Props = {};

type CardProps = {};

const Card = styled.div<CardProps>`
    border: 1px solid var(--border);
    background: white;
    padding: 16px;
    display: flex;
    gap: 16px;
    flex-direction: column;

    h1 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 600;
    }
`;

const ActionsButtonList = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    gap: 8px;
    margin-top: 8px;

    @media screen and (max-width: 570px) {
        flex-direction: column;
    }

    > li {
        flex: 1;

        button {
            width: 100%;
            height: 100%;
            padding: 12px 16px;
            font-family: Outfit;
            text-transform: uppercase;
            border: 1px solid var(--border);
            border-radius: 0;
            background-color: white;
            /* border-color: #c3ccd5; */
            color: #3f4c5a;
            font-weight: 600;
            font-size: 0.9rem;
            letter-spacing: calc(0.04 * 0.9rem);
            transition: background-color 0.2s;

            span {
                margin-right: 8px;
            }

            &:hover {
                background-color: var(--border);
            }
        }
    }
`;

const ImageOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.66);
    z-index: 25;
    cursor: pointer;

    img {
        object-fit: contain;
        max-height: calc(100vh - 32px);
        max-width: calc(100vw - 32px);
        min-width: 256px;
        min-height: 256px;
    }
`;

const Task = (props: Props) => {
    const params = useParams();
    const tasks = useContext(TasksContext);
    const { toggleStatus, removeTask } = useContext(ActionsContext);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const task = useMemo(
        () => tasks.find((t) => t.id == params.id),
        [params, tasks]
    );

    useEffect(() => {
        if (!task) navigate("/");
    }, [task]);

    if (!task) return <></>;

    return (
        <>
            {!!imageUrl && (
                <Portal>
                    <ImageOverlay onClick={() => setImageUrl("")}>
                        <img src={imageUrl} alt="" />
                    </ImageOverlay>
                </Portal>
            )}
            <Card>
                {!!task.images.length && (
                    <ImageList
                        onImageView={(url) => setImageUrl(url)}
                        images={task.images}
                    />
                )}
                <h1>{task.title}</h1>
                <Categories ids={task.categories} showEmpty />
            </Card>
            <ActionsButtonList>
                <li>
                    <button onClick={() => removeTask(task.id)}>
                        <DeleteFilled /> Remove Task
                    </button>
                </li>
                <li>
                    <button onClick={() => toggleStatus(task.id)}>
                        {task.done ? (
                            <>
                                <CheckSquareFilled /> Done
                            </>
                        ) : (
                            <>
                                <MinusSquareOutlined /> Not Done
                            </>
                        )}{" "}
                    </button>
                </li>
                <li>
                    <button>
                        <EditFilled /> Modify
                    </button>
                </li>
            </ActionsButtonList>
        </>
    );
};

export default Task;
