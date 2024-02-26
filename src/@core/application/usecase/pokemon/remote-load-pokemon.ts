import { LoadPokemon } from "~/@core/domain";
import { HttpClient } from "../../protocols";

export class RemoteLoadPokemon implements LoadPokemon {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<RemoteLoadPokemon.ApiResponse>
    ) { };

    async exec({ pokemonName }: RemoteLoadPokemon.Params): Promise<RemoteLoadPokemon.Response> {
        try {
            const response = await this.httpClient.request({
                url: `${this.url}/${pokemonName}`,
                method: 'get'
            });

            if (!Boolean(response.data)) {
                return { name: '', imageUrl: '' };
            }

            return this.parseResponse(response.data as RemoteLoadPokemon.ApiResponse);
        } catch (error) {
            alert('[PokeAPI] Not found.');
            return { name: '', imageUrl: '' };
        }
    }

    private parseResponse({ name, sprites }: RemoteLoadPokemon.ApiResponse): RemoteLoadPokemon.Response {
        return {
            name,
            imageUrl: sprites.other.dream_world.front_default
        };
    }
}

namespace RemoteLoadPokemon {
    export type Params = LoadPokemon.Params;
    export type ApiResponse = LoadPokemon.ApiResponse;
    export type Response = LoadPokemon.Response;
}