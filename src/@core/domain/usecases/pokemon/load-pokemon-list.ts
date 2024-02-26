export interface LoadPokemonList {
    exec: () => Promise<LoadPokemonList.Response>;
}

export namespace LoadPokemonList {
    export type ApiResponse = {
        name: string;
        image_url: string;
    }[];

    export type Response = {
        name: string;
        imageUrl: string;
    }[];
}