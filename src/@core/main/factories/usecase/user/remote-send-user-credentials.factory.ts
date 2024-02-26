import { RemoteSendUserCredentials } from "~/@core/application";
import { httpClient } from "~/@core/infra";

export const makeRemoteSendUserCredentials = (): RemoteSendUserCredentials => {
    return new RemoteSendUserCredentials('/login', httpClient);
}