export type TaskData = {
    id: string;
    title: string;
    images: File[] | FileList;
    categories: string[];
};

export type Category = {
    name: string;
    colorDegree: number;
};
