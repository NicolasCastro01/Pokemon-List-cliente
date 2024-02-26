interface UserCredentialsProps {
    email: string;
    password: string;
};

export class UserCredentialsDTO {
    public readonly email: string;
    public readonly password: string;

    constructor({ email, password }: UserCredentialsProps) {
        this.email = email;
        this.password = password;
    }
}