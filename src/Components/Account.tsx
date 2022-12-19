import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import supabase from "../supabase";

type Props = {};

const AccountCard = styled.div`
    padding: 16px 0;
    background-color: white;
    border-top: 1px solid var(--border);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
            background: var(--primary);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-family: Outfit;
            font-weight: 500;
        }
    }
`;

function Account({}: Props) {
    const { isLoading, isError, data } = useQuery(["user"], () =>
        supabase.auth.getUser()
    );

    const Container = ({ children, isError }: any) => (
        <AccountCard>
            <div className={`container ${isError ? "red" : ""}`}>
                <span>{children}</span>
                <button>Sign out</button>
            </div>
        </AccountCard>
    );

    if (isLoading) return <Container>Loading...</Container>;

    if (isError || !data.data.user)
        return <Container isError={isError}>Error</Container>;

    const metaDataName = data.data.user.user_metadata.name;
    const googleName =
        data.data.user.identities &&
        data.data.user.identities[1].identity_data.full_name;

    return <Container>{metaDataName || googleName}</Container>;
}

export default Account;
