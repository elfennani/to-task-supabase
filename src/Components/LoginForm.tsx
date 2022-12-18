import { GoogleCircleFilled, GoogleOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";
import supabase from "../supabase";

type Props = {};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: calc(100vw - 32px);
    margin: 0 auto;
    padding: 16px;
    background: white;
    border-radius: 8px;
    border: 1px solid var(--border);
    gap: 16px;

    h1 {
        margin: 0;
        font-weight: 500;
        font-size: 1.5rem;
    }

    p {
        margin: 0;
    }

    button {
        background: var(--primary);
        color: white;
        font-family: Outfit;
        padding: 8px 16px;
        font-size: 1rem;
        font-weight: 500;
        border: none;
        border-radius: 3px;

        &:hover {
            background: var(--primaryDark);
        }
    }
`;

const InputContainer = styled.label`
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.8rem;
    color: var(--grey);

    p[role="alert"] {
        color: red;
    }

    input {
        width: 100%;
        padding: 8px 12px;
        font-size: 0.9rem;
        font-family: Outfit;
        border-radius: 3px;
        outline: none;
        border: none;
        background: var(--border);
        display: block;
        margin-top: 4px;
    }
`;

const Hr = styled.div`
    background: var(--border);
    margin: 0 32px;
    height: 1px;
`;

const LoginForm = (props: Props) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const [isSignUp, setIsSignUp] = useState(false);

    const loginHandler = async ({ name, email, password }: FieldValues) => {
        if (isSignUp) {
            let { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: "Nizar Elfennani",
                    },
                },
            });

            console.log(data);
            if (error) console.error(error);
            if (data.session) location.reload();

            return;
        }

        let { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        console.log(data);
        if (error) console.error(error);
        if (data.session) location.reload();
    };

    const loginWithGoogleHandler = async () => {
        let { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
    };

    return (
        <Form onSubmit={handleSubmit(loginHandler)}>
            <h1>Login Form</h1>

            {isSignUp && (
                <InputContainer>
                    full name
                    <input
                        type="text"
                        placeholder="John Doe"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name?.message && (
                        <p role="alert">{errors.name?.message.toString()}</p>
                    )}
                </InputContainer>
            )}

            <InputContainer>
                email
                <input
                    type="email"
                    placeholder="joe.doe@example.xyz"
                    {...register("email", {
                        required: "Email Adress is required",
                    })}
                />
                {errors.email?.message && (
                    <p role="alert">{errors.email?.message.toString()}</p>
                )}
            </InputContainer>
            <InputContainer>
                password
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />
                {errors.password?.message && (
                    <p role="alert">{errors.password?.message.toString()}</p>
                )}
            </InputContainer>

            {!isSignUp ? (
                <p>
                    No Account?{" "}
                    <a href="#" onClick={() => setIsSignUp(true)}>
                        Sign up
                    </a>
                </p>
            ) : (
                <p>
                    Already have an account?{" "}
                    <a href="#" onClick={() => setIsSignUp(false)}>
                        Sign in
                    </a>
                </p>
            )}
            <button type="submit">Login</button>
            <Hr />
            <button type="button" onClick={loginWithGoogleHandler}>
                <GoogleOutlined /> Login with google
            </button>
        </Form>
    );
};

export default LoginForm;
