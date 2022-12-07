import styles from "./Tasks.module.scss";

type Props = {
    images: File[] | FileList;
};

const ImageThumbnail = ({ images }: Props) => {
    return (
        <div className={styles.thumbnail}>
            <img src={URL.createObjectURL(images[0])} alt="" />
        </div>
    );
};

export default ImageThumbnail;
