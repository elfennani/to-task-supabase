import { PlusOutlined } from "@ant-design/icons";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { Category } from "../../types";

type Props = { cat: Category };

const CategoryItem = ({ cat }: Props) => {
    return (
        <li
            style={{
                backgroundColor: `hsl(${cat.colorDegree}, 91%, 91%)`,
            }}
        >
            {cat.name}
        </li>
    );
};

export default CategoryItem;
