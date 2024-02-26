import { SendUserCredentials } from "~/@core/domain";
import { UserCredentialsDTO } from "~/@core/infra";
import { HttpClient } from "../../protocols";

export class RemoteSendUserCredentials implements SendUserCredentials {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<string>
    ) { };

    async exec(credentials: UserCredentialsDTO): Promise<string> {
        try {
            const response = await this.httpClient.request({
                url: this.url,
                method: 'post',
                data: credentials
            });

            const token = response.data as string;

            return token;
        } catch (error) {
            alert('Dados inválidos.');
            throw new Error('Dados inválidos.');
        }
    }
}