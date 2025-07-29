import type {
    AccountInfo,
    AuthorizationResponse,
    BlogItem,
    ErrorItem,
    LoginData,
    NewAccountData,
    Session,
} from "./types.ts";
import axios, { AxiosError } from "axios";
import { sampleBlog } from "./mock.ts";

const base = import.meta.env.VITE_API_BASE;

function handleSessionCreate(data: AuthorizationResponse) {
    localStorage.setItem("session", JSON.stringify(data.session));
    localStorage.setItem("account", JSON.stringify(data.account));
}

function removeSession() {
    localStorage.removeItem("session");
    localStorage.removeItem("account");
}

export function getSessionToken(): string | null {
    const data = localStorage.getItem("session");
    if (!data) return null;
    const session = JSON.parse(data) as Session;
    return session.token ?? null;
}

export class ApiError extends Error {
    public errors: ErrorItem[];

    constructor(axiosError: AxiosError<{ errors: ErrorItem[] }>) {
        super("An error occurred while communicating with the API");
        this.errors = [];

        if (!axiosError.response) {
            this.message = axiosError.message;
            return;
        }

        if (!axiosError.response.data || !axiosError.response.data.errors) {
            this.message = "Unknown error occurred";
            return;
        }

        this.errors = axiosError.response.data.errors;
    }
}

export class Backend {
    public static async signUp(data: NewAccountData): Promise<AuthorizationResponse> {
        try {
            const res = await axios.post(`${base}/account/sign-up`, data);
            handleSessionCreate(res.data);

            return res.data;
        } catch (e) {
            throw this.createError(e);
        }
    }

    public static async login(data: LoginData): Promise<AuthorizationResponse> {
        try {
            const res = await axios.post(`${base}/account/login`, data);
            handleSessionCreate(res.data);

            return res.data;
        } catch (e) {
            throw this.createError(e);
        }
    }

    public static async refreshSession() {
        try {
            const res = await axios.get(`${base}/session/refresh`, {
                headers: {
                    Authorization: getSessionToken(),
                },
            });

            handleSessionCreate(res.data);

            return res.data;
        } catch (e) {
            throw this.createError(e);
        }
    }

    public static async logout() {
        try {
            await axios.get(`${base}/session/revoke`, {
                headers: {
                    Authorization: getSessionToken(),
                },
            });
        } catch (e) {
            throw this.createError(e);
        }
    }

    public static async fetchSessionAccount(): Promise<AccountInfo>
    public static async fetchSessionAccount(fail: boolean): Promise<AccountInfo | undefined>
    public static async fetchSessionAccount(fail = true): Promise<AccountInfo | undefined> {
        try {
            const res = await axios.get(`${base}/account/info`, {
                headers: {
                    Authorization: getSessionToken(),
                },
            });
            return res.data;
        } catch (e) {
            if (!fail) return undefined;
            throw this.createError(e);
        }
    }

    public static async updateAccount(account: Omit<AccountInfo, "blogUuids">): Promise<void> {
        try {
            await axios.patch(`${base}/account/update`, account, {
                headers: {
                    Authorization: getSessionToken(),
                },
            });
        } catch (e) {
            throw this.createError(e);
        }
    }

    public static async fetchBlog(uuid: string): Promise<BlogItem> {
        try {
            // todo implement
            // const res = await axios.get(`${base}/blog/${uuid}`, {
            //     headers: {
            //         Authorization: getSessionToken(),
            //     },
            // });
            // return res.data;
            return sampleBlog(uuid);
        } catch (e) {
            throw this.createError(e);
        }
    }

    private static createError(e: unknown) {
        if (e instanceof AxiosError) {
            if (e.status === 403) {
                removeSession();
                console.warn("Session expired, redirecting to login");
                window.location.pathname = "/login";
                return;
            }

            throw new ApiError(e);
        }
        console.error("Unknown error api error", e);
        return new Error("Unknown API error");
    }
}
