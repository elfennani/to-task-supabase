import styles from "./Tasks.module.scss";

type Props = {
    images: string[];
};

const ImageThumbnail = ({ images }: Props) => {
    return (
        <button className={styles.thumbnail} type="button" title="Open Image">
            <img src={images[0]} alt="" />
            {images.length > 1 && (
                <div className={styles.moreImages}>
                    <span>+{images.length - 1} more</span>
                </div>
            )}
        </button>
    );
};

export default ImageThumbnail;
