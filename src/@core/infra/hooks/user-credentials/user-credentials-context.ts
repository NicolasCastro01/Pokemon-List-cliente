import { useContext } from "react";
import { UserCredentialsContext as UserCredentialsContextType } from "~/@core/domain";
import { UserCredentialsContext } from "../../contexts/user";

export const useUserCredentialsContext = (): UserCredentialsContextType => {
    const context = useContext(UserCredentialsContext);

    return context;
}