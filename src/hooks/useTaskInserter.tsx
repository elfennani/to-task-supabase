import { useContext, useState } from "react";
import ActionsContext from "../contexts/ActionsContext";
import { Category, TaskData } from "../types";
import { Portal } from "react-portal";
import { v4 as uuidv4 } from "uuid";
import CategorySelectionModal from "../Components/CategorySelectionModal";
import CategoriesContext from "../contexts/CategoriesContext";
import supabase from "../supabase";
import { useQueryClient } from "@tanstack/react-query";

const useTaskInserter = (task: string, onClear: () => void) => {
    const [imageFiles, setImageFiles] = useState<Set<File>>(new Set());
    const categories = useContext(CategoriesContext);
    const [selectedCatsIds, setSelectedCatsIds] = useState<Set<number>>(
        new Set()
    );
    const [catsModal, setCatsModal] = useState(false);
    const [uploadingImages, setUploadingImages] = useState<number | null>(null);
    const client = useQueryClient();
    // const { addTask, refresh } = useContext(ActionsContext);

    const addImageHandler = (files: FileList) => {
        setImageFiles((paths) => {
            const newSet = new Set([...paths, ...files]);

            if (newSet.size > 5) {
                alert("Can't add more than 5 pictures");
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

    const addTaskHandler = async () => {
        if (!task.trim()) return;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw "User not authenticated";

        const dateAdded = new Date().toISOString();

        const { data, error } = await supabase
            .from("tasks")
            .insert([
                {
                    title: task,
                    "Date Added": dateAdded,
                    user_id: user.id,
                },
            ])
            .select("*");

        if (error) return;

        const task_id = data[0].id;

        const { error: CatError } = await supabase
            .from("task_categories")
            .insert(
                [...selectedCatsIds].map((id) => ({
                    task_id: data[0].id,
                    cat_id: id,
                }))
            )
            .select("*");
        if (CatError) return;

        if (imageFiles.size) {
            for (let i = 0; i < imageFiles.size; i++) {
                const image = [...imageFiles][i];
                setUploadingImages(i);
                const { error } = await supabase.storage
                    .from("images")
                    .upload(`${user.id}/${task_id}/image_${i}.png`, image);
                if (error) {
                    console.error("Failed to upload image");
                    return;
                }
            }

            setUploadingImages(null);
        }

        client.setQueryData(
            ["tasks"],
            (tasks: TaskData[] | undefined) =>
                tasks && [
                    ...tasks,
                    {
                        id: task_id,
                        title: task,
                        categories: [...selectedCatsIds],
                        dateAdded: new Date(dateAdded).valueOf(),
                        done: false,
                        images: [],
                    },
                ]
        );

        client.invalidateQueries(["tasks"]);

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
        imageUploaded: uploadingImages,
    };
};

export default useTaskInserter;
