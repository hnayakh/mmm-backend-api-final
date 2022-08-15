import { HttpService } from '@nestjs/axios';
export declare class AxiosService {
    private readonly httpService;
    constructor(httpService: HttpService);
    post(url: any, data: any): Promise<any>;
    postRaw(url: any, data: any): Promise<any>;
    multipartPost(url: any, data: any): Promise<any>;
    put(url: any, data: any): Promise<any>;
    get(url: any): Promise<any>;
    getImageBuffer(url: any): Promise<any>;
    delete(url: any): Promise<any>;
}
