import { createContext } from "react";
import { Category } from "../types";

export type CategoriesActions = {
    add: (cat: { colorDegree: number; name: string }) => void;
    remove: (uuid: number) => void;
};

export default createContext<CategoriesActions>({
    add(cat) {},
    remove(uuid: number) {},
});
