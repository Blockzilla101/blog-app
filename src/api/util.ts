import type { AuthorizationResponse, ErrorItem, Session } from "./types.ts";
import { Backend } from "./backend.ts";

export function applyErrorsToRef(obj: Record<string, string>, errors: ErrorItem[]) {
    for (const error of errors) {
        if (error.path in obj) {
            obj[error.path] = error.msg;
        }
    }
}

let refreshedSession = false;

export async function checkIfLoggedIn(): Promise<boolean> {
    try {
        const session = JSON.parse(localStorage.getItem("session") ?? "") as Session;
        const account = JSON.parse(localStorage.getItem("account") ?? "") as AuthorizationResponse["account"];

        if (!session.token || !account.firstName || !account.lastName || session.expiresAt < Date.now()) {
            return false;
        }

        if (!refreshedSession) {
            await Backend.refreshSession();
            refreshedSession = true;
        }

        return true;
    } catch (e) {
        return false;
    }
}

