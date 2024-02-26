import { HttpStatusCodeEnum } from '~/@core/infra';
import { HttpClient, HttpRequestParams, HttpResponse } from '../protocols';

export class HttpClientSpy<ResponseType = any>
    implements HttpClient<ResponseType> {
    url = '';
    headers?: any;
    response: HttpResponse<ResponseType> = {
        statusCode: HttpStatusCodeEnum.ok
    };

    async request(
        params: HttpRequestParams
    ): Promise<HttpResponse<ResponseType>> {
        this.url = params.url;
        this.headers = params.headers;
        return this.response;
    }
}