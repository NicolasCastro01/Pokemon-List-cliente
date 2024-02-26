export interface SendPokemon {
    exec: (Params: SendPokemon.Params) => Promise<void>;
}

export namespace SendPokemon {
    export type Params = {
        name: string;
        image_url: string;
    };
}