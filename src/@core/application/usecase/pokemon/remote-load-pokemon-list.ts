import { LoadPokemonList } from "~/@core/domain";
import { HttpClient } from "../../protocols";

export class RemoteLoadPokemonList implements LoadPokemonList {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<RemoteLoadPokemonList.ApiResponse>
    ) { };

    async exec(): Promise<RemoteLoadPokemonList.Response> {
        try {
            const response = await this.httpClient.request({
                url: this.url,
                method: 'get',
            });

            if (!Boolean(response.data)) {
                return [];
            }

            return this.parseResponse(response.data as RemoteLoadPokemonList.ApiResponse);
        } catch (error: any) {
            throw new Error("Ocorreu um erro na listagem de pokemons.");
        }
    };

    private parseResponse(ResponseBody: RemoteLoadPokemonList.ApiResponse): RemoteLoadPokemonList.Response {
        if (ResponseBody.length === 0) return [];

        return ResponseBody.map(({ name, image_url }) => ({ name, imageUrl: image_url }));
    }
}

namespace RemoteLoadPokemonList {
    export type ApiResponse = LoadPokemonList.ApiResponse;
    export type Response = LoadPokemonList.Response;
}