import { HttpRequestParams } from './http-request-params.type';
import { HttpResponse } from './http-response.type';

export interface HttpClient<ResponseData = any> {
    request: (params: HttpRequestParams) => Promise<HttpResponse<ResponseData>>;
}