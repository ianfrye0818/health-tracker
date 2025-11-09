export interface MessageResponseDto<T = void> {
    message: string;
    data: T;
    statusCode?: number;
    success?: boolean;
}