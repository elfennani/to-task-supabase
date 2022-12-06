import { createContext } from "react";
import { Category } from "../types";

export type CategoriesActions = {
    add: (cat: Category) => void;
    remove: (uuid: string) => void;
};

export default createContext<CategoriesActions>({
    add(cat) {},
    remove(uuid: string) {},
});
