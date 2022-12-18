export type TaskData = {
    id: string;
    title: string;
    images: string[];
    categories: number[];
    done: boolean;
    dateAdded: number;
};

export type Category = {
    uuid: number;
    name: string;
    colorDegree: number;
};

export type Image = {
    type: string;
    file: File;
};
