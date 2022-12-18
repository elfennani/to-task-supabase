import { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../supabase";

type Props = {};

const UserCard = styled.div``;

const User = (props: Props) => {
    const [name, setName] = useState<string>();

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase.auth.getUser();
            if(data.user){
                let googleName = data.user.identities?.find(id => id.provider=="google");
            }
        })();
    }, []);

    return (
        <UserCard>
            <span>Welcome </span>
        </UserCard>
    );
};

export default User;
