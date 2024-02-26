import axios from "axios";
import { HttpStatusCodeEnum } from "~/@core/infra";
import { HttpClientSpy } from "../../test/mock-http";
import { RemoteLoadPokemon } from "./remote-load-pokemon";

type SutTypes = {
    httpClientSpy: HttpClientSpy;
    sut: RemoteLoadPokemon;
};

const makeSut = (url = 'URL'): SutTypes => {
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteLoadPokemon(url, httpClientSpy);
    return {
        sut,
        httpClientSpy
    };
};
describe('RemoteLoadPokemon', () => {

    beforeAll(() => {
        window.alert = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should load an pokemon', async () => {
        const { sut, httpClientSpy } = makeSut();
        const pokemonData = {
            name: '',
            imageUrl: ''
        };
        httpClientSpy.response = {
            statusCode: HttpStatusCodeEnum.ok,
            data: pokemonData
        }

        jest.spyOn(axios, 'request').mockResolvedValueOnce(pokemonData);
        await sut.exec({ pokemonName: '' });

        expect(httpClientSpy.response.statusCode).toBe(HttpStatusCodeEnum.ok);
        expect(httpClientSpy.response.data['name']).toBe(pokemonData.name);
        expect(httpClientSpy.response.data['imageUrl']).toBe(pokemonData.imageUrl);
    });

    it('should return without body', async () => {
        const { sut, httpClientSpy } = makeSut();
        httpClientSpy.response = {
            statusCode: HttpStatusCodeEnum.ok
        }

        const response = await sut.exec({ pokemonName: 'aa' })
        expect(httpClientSpy.response.data).toBeUndefined();
        expect(response.name).toBe('');
        expect(response.imageUrl).toBe('');
    });
});