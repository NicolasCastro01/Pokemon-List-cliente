import { HttpClientSpy } from "../../test/mock-http";
import { RemoteSendUserCredentials } from "./remote-send-user-credentials";

type SutTypes = {
    httpClientSpy: HttpClientSpy;
    sut: RemoteSendUserCredentials;
};

const makeSut = (url = 'URL'): SutTypes => {
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteSendUserCredentials(url, httpClientSpy);
    return {
        sut,
        httpClientSpy
    };
};
describe('RemoteSendUserCredentials', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get token', async () => {
        const { sut, httpClientSpy } = makeSut();

        const token = await sut.exec({ email: 'teste@verum.com', password: 'teste2024' });

        expect(token).not.toBeNull();
    });

    it('should not get token when credentials invalid', async () => {
        try {
            const { sut, httpClientSpy } = makeSut();

            jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(() => { throw new Error('') });

            await sut.exec({ email: 'teste@verum.com', password: 'teste2024' });

        } catch (error: any) {
            expect(error.message).toBe('Dados inválidos.');
        }
    })
});