export interface LoadPokemon {
    exec: (Params: LoadPokemon.Params) => Promise<LoadPokemon.Response>;
}

export namespace LoadPokemon {
    type Sprite = {
        other: DreamWorld;
    }

    type DreamWorld = {
        dream_world: FrontDefault;
    }

    type FrontDefault = {
        front_default: string;
    }

    export type Params = {
        pokemonName: string;
    }

    export type ApiResponse = {
        name: string;
        sprites: Sprite;
    };

    export type Response = {
        name: string;
        imageUrl: string;
    };
}