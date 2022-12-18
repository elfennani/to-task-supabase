import supabase from "./supabase";
import { TaskData } from "./types";

export const loadTasks = async (
    id: string | null = null
): Promise<TaskData[]> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw "User not authenticated";

    const query = supabase.from("tasks").select("*");

    const { data, error } = await (id ? query.eq("id", id) : query);

    if (error) throw "Failed to get tasks";

    const { data: categories } = await supabase
        .from("task_categories")
        .select("*")
        .in(
            "task_id",
            data.map((task) => task.id)
        );

    if (!categories) throw "Failed to retrive task categories";

    return data.map((task) => ({
        id: task.id,
        title: task.title,
        images: [],
        done: task.done,
        dateAdded: new Date(task["Date Added"]).valueOf(),
        categories: categories
            .filter((cat) => cat.task_id == task.id)
            .map((cat) => cat.cat_id),
    }));
};
