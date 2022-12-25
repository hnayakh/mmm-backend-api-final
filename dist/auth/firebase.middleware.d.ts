import { NestMiddleware } from '@nestjs/common';
export declare class FirebaseMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): void;
}
