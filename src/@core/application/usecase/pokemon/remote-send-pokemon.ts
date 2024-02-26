import { SendPokemon } from "~/@core/domain";
import { HttpClient } from "../../protocols";

export class RemoteSendPokemon implements SendPokemon {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<void>
    ) { };

    async exec(params: RemoteSendPokemon.Params): Promise<void> {
        try {
            await this.httpClient.request({
                url: this.url,
                method: 'post',
                data: params
            });
        } catch (error) {
            alert('[Pokemon] AlreadyExists!');
        }
    }
}


namespace RemoteSendPokemon {
    export type Params = SendPokemon.Params;
}