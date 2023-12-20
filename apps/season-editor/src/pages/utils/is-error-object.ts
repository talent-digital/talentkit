import { ErrorObject } from "../types";

export const isErrorObject = (value: unknown): value is ErrorObject => {
  return Boolean(
    value && typeof value === "object" && value !== null && "isError" in value
  );
};
