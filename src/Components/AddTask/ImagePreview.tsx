import React from "react";

type Props = {
    file: File;
    onRemove: (file: File) => void;
};

const ImagePreview = (props: Props) => {
    return (
        <div onClick={() => props.onRemove(props.file)}>
            <img
                src={URL.createObjectURL(props.file)}
                alt={props.file.name}
                key={props.file.name}
            />
        </div>
    );
};

export default ImagePreview;
