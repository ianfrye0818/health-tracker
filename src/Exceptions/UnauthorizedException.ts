
export class UnauthorizedException extends Error {
    statusCode = 401;
    constructor(message: string) {
        super(message);
    }
}
