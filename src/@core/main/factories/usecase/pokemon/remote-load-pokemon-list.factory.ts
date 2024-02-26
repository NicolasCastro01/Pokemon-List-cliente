import { RemoteLoadPokemonList } from "~/@core/application";
import { httpClient } from "~/@core/infra";

export const makeRemoteLoadPokemonList = (): RemoteLoadPokemonList => {
    return new RemoteLoadPokemonList('/api/pokemon/all', httpClient);
}