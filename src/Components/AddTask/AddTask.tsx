import Section from "../Section";
import styles from "./AddTask.module.scss";
import { EditFilled, FileImageFilled, FileAddFilled } from "@ant-design/icons";
import { useState } from "react";
import ImagePreview from "./ImagePreview";
import Categories from "../Categories";
import { Category, TaskData } from "../../types";
import useTaskInserter from "../../hooks/useTaskInserter";

type Props = {};

const AddTask = (props: Props) => {
    const [task, setTask] = useState("");

    const {
        addImageHandler,
        addTaskHandler,
        selectedCatsIds,
        images,
        removeImageHandler,
        categoryModal,
        openModal,
    } = useTaskInserter(task, () => setTask(""));

    return (
        <Section title="Create a Task" card className={styles.card}>
            {categoryModal}
            {!!images.size && (
                <ul className={styles.imgsList}>
                    {[...images].map((file) => (
                        <li key={file.name}>
                            <ImagePreview
                                file={file}
                                onRemove={removeImageHandler}
                            />
                        </li>
                    ))}
                    <li className={styles.add}>
                        <label>
                            <FileAddFilled />
                            Add More
                            <input
                                type="file"
                                name="image"
                                title="thumbnail"
                                accept="image/*"
                                multiple
                                onChange={(e) =>
                                    e.target.files &&
                                    addImageHandler(e.target.files)
                                }
                            />
                        </label>
                    </li>
                </ul>
            )}
            <form
                className={styles.addTask}
                onKeyDown={(e) =>
                    e.ctrlKey && e.key == "Enter" && addTaskHandler()
                }
            >
                <div className={styles.input}>
                    <EditFilled />
                    <div className={styles.textHolder} data-content={task}>
                        <textarea
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Something interesting to do?"
                            rows={1}
                            value={task}
                        />
                    </div>
                </div>
                {!images.size && (
                    <div className={styles.imageInput}>
                        <FileImageFilled />
                        Image
                        <input
                            type="file"
                            name="image"
                            title="thumbnail"
                            accept="image/*"
                            multiple
                            onChange={(e) =>
                                e.target.files &&
                                addImageHandler(e.target.files)
                            }
                        />
                    </div>
                )}
            </form>
            {task.trim() && <div className={styles.divider} />}
            <footer className={task.trim() ? styles.show : ""}>
                <Categories ids={selectedCatsIds} onAdd={openModal} />
                <button type="button" onClick={addTaskHandler}>
                    Add Task
                </button>
            </footer>
        </Section>
    );
};

export default AddTask;
