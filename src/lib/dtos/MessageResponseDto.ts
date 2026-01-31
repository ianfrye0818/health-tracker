export interface MessageResponseDto<T = any> {
  message: string;
  data: T | null;
  statusCode?: number;
  success?: boolean;
}
