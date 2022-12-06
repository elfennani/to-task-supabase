import { ReactElement, useContext, useMemo, useState } from "react";
import CategoriesActionsContext, {
    CategoriesActions,
} from "../contexts/CategoriesActionsContext";
import CategoriesContext from "../contexts/CategoriesContext";
import { Category } from "../types";
import { v4 as uuidv4 } from "uuid";

type Props = {
    children: ReactElement | ReactElement[];
};

const CategoriesProvider = (props: Props) => {
    const [cats, setCats] = useState<Category[]>([
        {
            uuid: uuidv4(),
            name: "Development",
            colorDegree: 125,
        },
        {
            uuid: uuidv4(),
            name: "Planning",
            colorDegree: 230,
        },
    ]);

    const actions = useMemo<CategoriesActions>(
        () => ({
            add(cat) {
                setCats((cats) => [...cats, { ...cat, uuid: uuidv4() }]);
            },
            remove(uuid) {
                setCats((cats) => cats.filter((cat) => cat.uuid != uuid));
            },
        }),
        []
    );

    return (
        <CategoriesContext.Provider value={cats}>
            <CategoriesActionsContext.Provider value={actions}>
                {props.children}
            </CategoriesActionsContext.Provider>
        </CategoriesContext.Provider>
    );
};

export default CategoriesProvider;
