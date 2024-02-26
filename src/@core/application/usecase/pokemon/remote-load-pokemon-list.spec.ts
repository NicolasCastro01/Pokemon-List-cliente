import axios from "axios";
import { LoadPokemonList } from "~/@core/domain";
import { HttpStatusCodeEnum } from "~/@core/infra";
import { HttpClientSpy } from "../../test/mock-http";
import { RemoteLoadPokemonList } from "./remote-load-pokemon-list";

type SutTypes = {
    httpClientSpy: HttpClientSpy;
    sut: RemoteLoadPokemonList;
};

const makeSut = (url = 'URL'): SutTypes => {
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteLoadPokemonList(url, httpClientSpy);
    return {
        sut,
        httpClientSpy
    };
};
describe('RemoteLoadPokemonList', () => {
    beforeAll(() => {
        window.alert = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should load pokemons', async () => {
        const { sut, httpClientSpy } = makeSut();
        const pokemonsData: LoadPokemonList.ApiResponse = [{
            name: '',
            image_url: ''
        }];

        httpClientSpy.response = {
            statusCode: HttpStatusCodeEnum.ok,
            data: pokemonsData
        }

        jest.spyOn(axios, 'request').mockResolvedValueOnce(pokemonsData);

        await sut.exec();

        expect(httpClientSpy.response.statusCode).toBe(HttpStatusCodeEnum.ok);
        expect(httpClientSpy.response.data[0]['name']).toBe(pokemonsData[0].name);
        expect(httpClientSpy.response.data[0]['image_url']).toBe(pokemonsData[0].image_url);
    });

    it("should return empty pokemons list", async () => {
        const { sut, httpClientSpy } = makeSut();
        const pokemonsData: LoadPokemonList.ApiResponse = [];

        httpClientSpy.response = {
            statusCode: HttpStatusCodeEnum.ok,
            data: pokemonsData
        }

        jest.spyOn(axios, 'request').mockResolvedValueOnce(pokemonsData);

        const response = await sut.exec();

        expect(response.length).toBe(0);
        expect(response).toEqual([]);
    });

    it("should response data not exists and throw and error", async () => {
        const { sut, httpClientSpy } = makeSut();

        try {
            httpClientSpy.response = {
                statusCode: HttpStatusCodeEnum.ok
            }

            await sut.exec();
        } catch (error: any) {
            expect(error.message).toBe("Ocorreu um erro na listagem de pokemons.")
        }
    });

    it("should throw if request error", async () => {
        const { sut, httpClientSpy } = makeSut();

        try {
            httpClientSpy.response = {
                statusCode: HttpStatusCodeEnum.ok
            }

            jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(() => { throw new Error('') });

            await sut.exec();
        } catch (error: any) {
            expect(error.message).toBe("Ocorreu um erro na listagem de pokemons.")
        }
    })
});