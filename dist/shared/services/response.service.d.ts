import { Response } from 'express';
export declare class ResponseService {
    errorResponse(status: number, message: string, res: Response): Response<any, Record<string, any>>;
    successResponse(status: number, message: string, data: any, res: Response, headers?: any): Response<any, Record<string, any>>;
}
