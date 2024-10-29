export class ApiError<T> extends Error {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  constructor(statusCode: number, message: string, data: T, success: boolean) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = success;
  }
}
