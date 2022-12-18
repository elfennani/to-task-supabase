import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import CategoriesActionsContext, {
    CategoriesActions,
} from "../contexts/CategoriesActionsContext";
import CategoriesContext from "../contexts/CategoriesContext";
import { Category } from "../types";
import { v4 as uuidv4 } from "uuid";
import supabase from "../supabase";

type Props = {
    children: ReactElement | ReactElement[];
};

const CategoriesProvider = (props: Props) => {
    const [cats, setCats] = useState<Category[]>([]);

    const removeCategory = async (id: number) => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        await supabase
            .from("categories")
            .delete()
            .eq("user_id", user.id)
            .eq("id", id);

        loadCategories();
    };

    const actions = useMemo<CategoriesActions>(
        () => ({
            add: async (cat) => {
                const {
                    data: { user },
                } = await supabase.auth.getUser();
                if (!user) return;

                const { data } = await supabase.from("categories").insert({
                    name: cat.name,
                    hue: cat.colorDegree,
                    user_id: user.id,
                });

                loadCategories();
            },
            remove: removeCategory,
        }),
        []
    );

    const loadCategories = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .eq("user_id", user.id);

        if (data) {
            setCats(
                data.map((cat) => ({
                    uuid: cat.id,
                    name: cat.name,
                    colorDegree: cat.hue,
                }))
            );
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={cats}>
            <CategoriesActionsContext.Provider value={actions}>
                {props.children}
            </CategoriesActionsContext.Provider>
        </CategoriesContext.Provider>
    );
};

export default CategoriesProvider;
