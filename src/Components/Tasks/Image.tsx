import { useQuery } from "@tanstack/react-query";
import supabase from "../../supabase";

type ImageProps = {
    image: string;
    taskId: string;
};

const getImageFile = async (image: string, taskId: string): Promise<string> => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw "Unable to get user data";

    const { data, error } = await supabase.storage
        .from("images")
        .download(`${userData.user.id}/${taskId}/${image}`);

    if (error) throw "Unable to get images";
    return URL.createObjectURL(data);
};

const Image = ({ image, taskId }: ImageProps) => {
    const { isLoading, data, isError, error } = useQuery(
        [image, taskId],
        async () => getImageFile(image, taskId)
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error as any}</div>;

    return <img src={data} alt={image} />;
};

export default Image;
