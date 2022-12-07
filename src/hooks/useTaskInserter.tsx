import { useContext, useState } from "react";
import ActionsContext from "../contexts/ActionsContext";
import { Category } from "../types";
import { Portal } from "react-portal";
import { v4 as uuidv4 } from "uuid";
import CategorySelectionModal from "../Components/CategorySelectionModal";
import CategoriesContext from "../contexts/CategoriesContext";

const useTaskInserter = (task: string, onClear: () => void) => {
    const [imageFiles, setImageFiles] = useState<Set<File>>(new Set());
    const categories = useContext(CategoriesContext);
    const [selectedCatsIds, setSelectedCatsIds] = useState<Set<string>>(
        new Set([categories.map((cat) => cat.uuid)[0]])
    );
    const [catsModal, setCatsModal] = useState(false);
    const { addTask } = useContext(ActionsContext);

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
            categories: [...selectedCatsIds],
            images: [...imageFiles],
            done: false,
            dateAdded: Date.now(),
        });

        onClear();
        setImageFiles(new Set());
        setSelectedCatsIds(new Set());
    };

    const categoryModal = catsModal && (
        <Portal>
            <CategorySelectionModal
                onClose={() => setCatsModal(false)}
                onConfirm={(newCats) => {
                    setSelectedCatsIds(new Set(newCats));
                    setCatsModal(false);
                }}
                selectedCats={[...selectedCatsIds]}
            />
        </Portal>
    );

    return {
        addTaskHandler,
        addImageHandler,
        removeImageHandler,
        images: imageFiles,
        selectedCatsIds: [...selectedCatsIds],
        categoryModal,
        openModal: () => setCatsModal(true),
    };
};

export default useTaskInserter;
