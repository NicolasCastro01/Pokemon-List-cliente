export interface SendUserCredentials {
    exec: (credentials: SendUserCredentials.Params) => Promise<string>;
}

export namespace SendUserCredentials {
    export type Params = {
        email: string;
        password: string;
    };
}