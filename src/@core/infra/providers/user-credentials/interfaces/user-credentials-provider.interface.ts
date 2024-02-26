import type { UserCredentials } from "~/@core/domain";

export interface UserCredentialsProviderProps {
    children: React.ReactNode;
    credentials?: UserCredentials;
}