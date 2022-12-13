import { EyeFilled } from "@ant-design/icons";
import { useMemo } from "react";
import styled from "styled-components";

type Props = {
    images: string[];
    onImageView: (imageUrl: string) => void;
};

const ImageListStyle = styled.ul`
    display: flex;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    gap: 8px;
    overflow-x: auto;
    overflow-y: hidden;

    li {
        width: 256px;
        flex: 0 0 256px;
        height: 192px;
        position: relative;

        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.24);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 8px;
            color: white;
            display: none;
        }

        &:hover .overlay {
            display: flex;
        }
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 1px solid var(--border);
    }
`;

function ImageList({ images, onImageView }: Props) {
    return (
        <ImageListStyle>
            {images.map((src, index) => (
                <li key={index} onClick={() => onImageView(src)}>
                    <img src={src} alt="" />
                    <div className="overlay">
                        <EyeFilled /> <span>View Image</span>
                    </div>
                </li>
            ))}
        </ImageListStyle>
    );
}

export default ImageList;
