export type AppErrorCode =
  | "INVALID_FIELDS"
  | "NO_CONNECTION"
  | "INVALID_CREDENTIALS"
  | "SERVER_ERROR";

export class AppError extends Error {
  constructor(
    public readonly code: AppErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}
