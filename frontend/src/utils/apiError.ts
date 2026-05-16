import { getErrorMessage as resolveErrorMessage } from "@utils/errorUtils";

export interface ApiErrorResponse {
  message: string;
  errorCode?: string;
  statusCode?: number;
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errorCode?: string;

  constructor(message: string, statusCode = 500, errorCode?: string) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace?.(this, this.constructor);
  }

  static from(error: unknown): ApiError {
    if (error instanceof ApiError) {
      return error;
    }

    const err = error as {
      status?: unknown;
      response?: {
        status?: unknown;
        data?: {
          errorCode?: unknown;
        };
      };
    };

    const statusCode =
      typeof err.response?.status === "number"
        ? err.response.status
        : typeof err.status === "number"
        ? err.status
        : 500;

    const rawErrorCode = (err as any).errorCode ?? err.response?.data?.errorCode;
    const errorCode = typeof rawErrorCode === "string" ? rawErrorCode : undefined;

    return new ApiError(resolveErrorMessage(error), statusCode, errorCode);
  }
}

export const getErrorMessage = (error: unknown, fallback?: string): string => {
  return resolveErrorMessage(error, fallback);
};
