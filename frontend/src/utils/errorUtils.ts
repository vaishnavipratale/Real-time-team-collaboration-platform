/**
 * errorUtils.ts
 *
 * One place for turning any caught error into a clean user-facing string.
 * Import this instead of writing error-handling logic inline.
 */

import { HttpError, NetworkError, TimeoutError } from "@api/httpClient";

const DEFAULT_ERROR_MESSAGE = "Something went wrong";
const RATE_LIMIT_MESSAGE = "Too many requests. Please wait a moment and try again.";

const cleanupMessage = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  return trimmed
    .replace(/^validation\./i, "")
    .replace(/\s+/g, " ");
};

const extractMessageFromData = (data: unknown): string => {
  if (!data) {
    return "";
  }

  if (typeof data === "string") {
    return cleanupMessage(data);
  }

  if (Array.isArray(data)) {
    const first = data
      .map((item) => extractMessageFromData(item))
      .find(Boolean);
    return first ?? "";
  }

  if (typeof data === "object") {
    const record = data as Record<string, unknown>;

    const message = extractMessageFromData(record.message);
    if (message) {
      return message;
    }

    const error = extractMessageFromData(record.error);
    if (error) {
      return error;
    }

    const errors = extractMessageFromData(record.errors);
    if (errors) {
      return errors;
    }
  }

  return "";
};

const resolveSafeHttpMessage = (
  error: HttpError,
  rawMessage: string,
  fallback: string,
): string => {
  const record =
    error.body && typeof error.body === "object"
      ? (error.body as Record<string, unknown>)
      : null;

  const errorCode =
    record && typeof record.errorCode === "string"
      ? record.errorCode.toUpperCase()
      : "";

  const normalizedRaw = rawMessage.toLowerCase();
  const hasInternalExceptionText =
    normalizedRaw.includes("exception:") ||
    normalizedRaw.includes("throttlerexception") ||
    normalizedRaw.includes("internal_");

  if (
    error.status === 429 ||
    errorCode === "INTERNAL_001" ||
    normalizedRaw.includes("too many requests")
  ) {
    return RATE_LIMIT_MESSAGE;
  }

  if (hasInternalExceptionText) {
    return fallback;
  }

  return rawMessage || fallback;
};

/**
 * Returns a clean, user-facing error message from any thrown value.
 */
export function getErrorMessage(
  error: unknown,
  fallback = DEFAULT_ERROR_MESSAGE,
): string {
  if (error instanceof HttpError) {
    const httpError = error;
    const raw =
      extractMessageFromData(httpError.body) || cleanupMessage(httpError.serverMessage);
    if (!raw) return fallback;

    const parts = raw
      .split(",")
      .map((part) => cleanupMessage(part))
      .filter(Boolean);
    const firstMessage = parts[0] || "";
    return resolveSafeHttpMessage(httpError, firstMessage, fallback);
  }

  if (error instanceof NetworkError) {
    return "Network error. Please check your internet connection and try again.";
  }

  if (error instanceof TimeoutError) {
    return "The request took too long. Please try again.";
  }

  if (error instanceof Error) {
    return cleanupMessage(error.message) || fallback;
  }

  if (typeof error === "string") {
    return cleanupMessage(error) || fallback;
  }

  return fallback;
}

/**
 * Returns true if the error is a specific HTTP status code.
 * Useful for branching logic (e.g. show a different UI for 404 vs 500).
 */
export function isHttpStatus(error: unknown, status: number): boolean {
  return error instanceof HttpError && error.status === status;
}
