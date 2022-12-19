import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import supabase from "../../supabase";
import Image from "./Image";
import styles from "./Tasks.module.scss";

type Props = {
    images: string[];
    task_id: string;
};

const ImageThumbnail = ({ images, task_id }: Props) => {
    return (
        <button className={styles.thumbnail} type="button" title="Open Image">
            <Image image={images[0]} taskId={task_id} />
            {images.length > 1 && (
                <div className={styles.moreImages}>
                    <span>+{images.length - 1} more</span>
                </div>
            )}
        </button>
    );
};

export default ImageThumbnail;
