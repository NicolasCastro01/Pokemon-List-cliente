import axios from "axios";
import { RemoteLoadPokemon } from "~/@core/application/usecase/pokemon/remote-load-pokemon";

export const makeRemoteLoadPokemon = (): RemoteLoadPokemon => {
    const httpClient = axios.create({ baseURL: 'https://pokeapi.co/api/v2' });

    return new RemoteLoadPokemon('/pokemon', httpClient);
}