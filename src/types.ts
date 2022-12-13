export type TaskData = {
    id: string;
    title: string;
    images: string[];
    categories: string[];
    done: boolean;
    dateAdded: number;
};

export type Category = {
    uuid: string;
    name: string;
    colorDegree: number;
};
