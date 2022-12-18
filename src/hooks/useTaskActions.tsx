import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase";
import { TaskData } from "../types";

export default (id: string, onRemove = () => {}) => {
    const queryClient = useQueryClient();

    const { mutate: removeTask } = useMutation(
        async () => {
            await supabase.from("task_categories").delete().eq("task_id", id);
            await supabase.from("tasks").delete().eq("id", id);
        },
        {
            onMutate: () => {
                queryClient.setQueryData(
                    ["tasks"],
                    (tasks: TaskData[] | undefined) =>
                        tasks && tasks.filter((t) => t.id != id)
                );
                queryClient.removeQueries(["task", id]);
            },
            onSettled: () => {
                queryClient.invalidateQueries(["tasks"]);
                onRemove();
            },
        }
    );

    const { mutate: toggleStatus } = useMutation(
        async (checked: boolean) =>
            supabase
                .from("tasks")
                .update({
                    done: !checked,
                })
                .eq("id", Number(id)),
        {
            onMutate: (checked) => {
                queryClient.setQueryData(
                    ["task", id],
                    (task: TaskData[] | undefined) => {
                        return task && [{ ...task[0], done: !checked }];
                    }
                );
                queryClient.setQueryData(
                    ["tasks"],
                    (tasks: TaskData[] | undefined) =>
                        tasks &&
                        tasks.map((t) =>
                            t.id == id ? { ...t, done: !checked } : t
                        )
                );
            },
            onSettled: () => {
                queryClient.invalidateQueries(["tasks"]);
                queryClient.invalidateQueries(["task", id]);
            },
        }
    );

    return { removeTask, toggleStatus };
};
