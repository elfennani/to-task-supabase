import { useContext, useState } from "react";
import ActionsContext from "../contexts/ActionsContext";
import { Category } from "../types";
import { v4 as uuidv4 } from "uuid";

const useTaskInserter = (task: string, onClear: () => void) => {
    const [imageFiles, setImageFiles] = useState<Set<File>>(new Set());
    const { addTask } = useContext(ActionsContext);

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

    const removeImageHandler = (file: File) => {
        setImageFiles((paths) => {
            const copyPaths = new Set(paths);
            copyPaths.delete(file);
            return copyPaths;
        });
    };

    const addTaskHandler = () => {
        if (!task.trim()) return;
        addTask({
            id: uuidv4(),
            title: task,
            categories: ["Testing"],
            images: [...imageFiles],
        });
        onClear();
        setImageFiles(new Set());
    };

    return {
        addTaskHandler,
        addImageHandler,
        removeImageHandler,
        images: imageFiles,
        categories: mockCats,
    };
};

export default useTaskInserter;
