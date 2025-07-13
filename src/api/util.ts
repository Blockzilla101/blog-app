import type { ErrorItem } from "./types.ts";

export function applyErrorsToRef(obj: Record<string, string>, errors: ErrorItem[]) {
    for (const error of errors) {
        if (error.path in obj) {
            obj[error.path] = error.msg;
        }
    }
}