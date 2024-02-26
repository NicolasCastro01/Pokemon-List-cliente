import { RemoteSendPokemon } from "~/@core/application";
import { httpClient } from "~/@core/infra";

export const makeRemoteSendPokemon = (): RemoteSendPokemon => {
    return new RemoteSendPokemon('/api/pokemon/import', httpClient);
}