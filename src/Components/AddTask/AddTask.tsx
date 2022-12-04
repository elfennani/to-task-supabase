import Section from "../Section";
import styles from "./AddTask.module.scss";
import {
    EditFilled,
    FileImageFilled,
    FileAddFilled,
    PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import ImagePreview from "./ImagePreview";
import Categories from "../Categories";
import { v4 as uuidv4 } from "uuid";
import { Category, TaskData } from "../../types";

type Props = {
    onAddTask?(task: TaskData): void;
};

const AddTask = (props: Props) => {
    const [imageFiles, setImageFiles] = useState<Set<File>>(new Set());
    const [task, setTask] = useState("");

    const mockCats: Category[] = [
        {
            name: "Development",
            colorDegree: 233,
        },
        {
            name: "Productivity",
            colorDegree: 125,
        },
    ];

    const addImageHandler = (files: FileList) => {
        setImageFiles((paths) => {
            const newSet = new Set([...paths, ...files]);

            if (newSet.size > 10) {
                alert("Can't add more than 10 pictures");
                return paths;
            }

            return newSet;
        });
    };

    const removeFileHandler = (file: File) => {
        setImageFiles((paths) => {
            const copyPaths = new Set(paths);
            copyPaths.delete(file);
            return copyPaths;
        });
    };

    const addTaskHandler = () => {
        if (!task.trim() || !props.onAddTask) return;
        props.onAddTask({
            id: uuidv4(),
            title: task,
            categories: ["Development"],
            images: Array.from(imageFiles),
        });
        setTask("");
        setImageFiles(new Set());
    };

    return (
        <Section title="Create a Task" card className={styles.card}>
            {!!imageFiles.size && (
                <div className={styles.imgsList}>
                    {[...imageFiles].map((file) => (
                        <ImagePreview
                            file={file}
                            onRemove={removeFileHandler}
                        />
                    ))}
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
                </div>
            )}
            <div className={styles.addTask}>
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
                {!imageFiles.size && (
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
            </div>
            {task.trim() && <div className={styles.divider} />}
            <footer className={task.trim() ? styles.show : ""}>
                <Categories categories={mockCats} />
                <button type="button" onClick={() => addTaskHandler()}>
                    Add Task
                </button>
            </footer>
        </Section>
    );
};

export default AddTask;
