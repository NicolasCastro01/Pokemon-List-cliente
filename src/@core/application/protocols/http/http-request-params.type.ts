export type HttpMethod = 'post' | 'get' | 'put' | 'patch' | 'delete';

export type HttpRequestParams<RequestBody = any, RequestHeaders = any> = {
    url: string;
    method: HttpMethod;
    data?: RequestBody;
    headers?: RequestHeaders;
    params?: any;
};