'use client';

import { useState } from "react";
import type { UserCredentials } from "~/@core/domain";
import { UserCredentialsContext } from "../../contexts/user";
import { UserCredentialsProviderProps } from "./interfaces";

export const UserCredentialsProvider = ({
    children,
    credentials
}: UserCredentialsProviderProps) => {
    const [contextState, setContextState] = useState<UserCredentials>(credentials || { email: '', token: '' });

    return (
        <UserCredentialsContext.Provider value={{ contextState, setContextState }}>
            {children}
        </UserCredentialsContext.Provider>
    );
}