import React from "react";

type Props = {
    file: File;
    onRemove: (file: File) => void;
};

const ImagePreview = (props: Props) => {
    return (
        <img
            src={URL.createObjectURL(props.file)}
            alt={props.file.name}
            onClick={() => props.onRemove(props.file)}
        />
    );
};

export default ImagePreview;
