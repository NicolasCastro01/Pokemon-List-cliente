import { HttpStatusCodeEnum } from "~/@core/infra";
import { HttpClientSpy } from "../../test/mock-http";
import { RemoteSendPokemon } from "./remote-send-pokemon";

type SutTypes = {
    httpClientSpy: HttpClientSpy;
    sut: RemoteSendPokemon;
};

const makeSut = (url = 'URL'): SutTypes => {
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteSendPokemon(url, httpClientSpy);
    return {
        sut,
        httpClientSpy
    };
};
describe('RemoteSendPokemon', () => {
    beforeAll(() => {
        window.alert = jest.fn()
    });

    it('should import an pokemon', async () => {
        const { sut, httpClientSpy } = makeSut();
        httpClientSpy.response = {
            statusCode: HttpStatusCodeEnum.created
        }
        await sut.exec({ name: 'teste', image_url: 'teste' });

        expect(httpClientSpy.response.statusCode).toBe(HttpStatusCodeEnum.created);
    });

    it('should throw an error when pokemon already exists', async () => {
        const { sut, httpClientSpy } = makeSut();
        httpClientSpy.response = {
            statusCode: HttpStatusCodeEnum.created
        }
        const spyAlert = jest.spyOn(window, 'alert').mockImplementationOnce(() => { });
        jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(() => { throw new Error('') });
        try {
            await sut.exec({ name: '', image_url: '' });
        } catch (error) {
            expect(spyAlert).toHaveBeenCalledWith('[Pokemon] AlreadyExists!');
        }
    });
});