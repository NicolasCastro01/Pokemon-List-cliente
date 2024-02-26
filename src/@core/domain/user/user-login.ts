import { Dispatch, SetStateAction } from "react";

export interface UserLoginCredentials {
    email: string;
    password: string;
}

export interface UserCredentials {
    email: string;
    token: string;
}

export interface UserCredentialsContext {
    contextState: UserCredentials;
    setContextState: Dispatch<SetStateAction<UserCredentials>>
}