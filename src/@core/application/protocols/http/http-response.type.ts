import { HttpStatusCodeEnum } from "~/@core/infra";

export type HttpResponse<BodyData = any> = {
    statusCode: HttpStatusCodeEnum | undefined;
    data?: BodyData;
};