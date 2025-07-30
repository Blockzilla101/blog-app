import type {
    AccountInfo,
    AuthorizationResponse,
    BlogItem,
    BlogList,
    ErrorItem,
    LoginData,
    NewAccountData,
    Session,
} from "./types.ts";
import axios, { AxiosError } from "axios";

const base = import.meta.env.VITE_API_BASE;

function saveAccount(data: AccountInfo) {
    localStorage.setItem("account", JSON.stringify(data));
}

function saveSession(data: Session) {
    localStorage.setItem("session", JSON.stringify(data));
}

function handleSessionCreate(data: AuthorizationResponse) {
    saveAccount(data.account);
    saveSession(data.session);
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

function hasErrorMessage(msg: string, errors: ErrorItem[]): boolean {
    return errors.some(error => error.msg.toLowerCase()
                                     .includes(msg.toLowerCase()));
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

    public static async refreshSession(): Promise<Session> {
        try {
            const res = await axios.get(`${base}/session/refresh`, {
                headers: this.getHeaders(),
            });

            saveSession(res.data);

            return res.data;
        } catch (e) {
            throw this.createError(e);
        }
    }

    public static async logout() {
        try {
            await axios.get(`${base}/session/revoke`, {
                headers: this.getHeaders(),
            });
            removeSession();
        } catch (e) {
            throw this.createError(e);
        }
    }

    public static async fetchSessionAccount(): Promise<AccountInfo>
    public static async fetchSessionAccount(fail: boolean): Promise<AccountInfo | undefined>
    public static async fetchSessionAccount(fail = true): Promise<AccountInfo | undefined> {
        try {
            const res = await axios.get(`${base}/account/info`, {
                headers: this.getHeaders(),
            });

            saveAccount(res.data);

            return res.data;
        } catch (e) {
            if (!fail) return undefined;
            throw this.createError(e);
        }
    }

    public static async updateAccount(account: Omit<AccountInfo, "blogUuids">): Promise<void> {
        try {
            await axios.patch(`${base}/account/update`, account, {
                headers: this.getHeaders(),
            });
        } catch (e) {
            throw this.createError(e);
        }
    }

    public static async fetchBlogs(opts: Partial<{ author: string, after: string, limit: number }>): Promise<BlogList> {
        try {
            const params = new URLSearchParams();
            if (opts.author) params.append("author", opts.author);
            if (opts.after) params.append("after", opts.after);
            if (opts.limit) params.append("limit", opts.limit.toString());

            const res = await axios.get(`${base}/blog/blogs`, {
                headers: this.getHeaders(),
                params,
            });

            return res.data;
        } catch (e) {
            throw this.createError(e);
        }
    }

    public static async fetchBlog(uuid: string): Promise<BlogItem> {
        try {
            const res = await axios.get(`${base}/blog/by-uuid/${uuid}`, {
                headers: this.getHeaders(),
            });
            return res.data;
        } catch (e) {
            throw this.createError(e);
        }
    }

    public static async createBlog(data: Omit<BlogItem, "uuid" | "createdAt" | "author">): Promise<BlogItem> {
        try {
            const res = await axios.post(`${base}/blog/create`, data, {
                headers: this.getHeaders(),
            });
            return res.data;
        } catch (e) {
            throw this.createError(e);
        }
    }

    public static async updateBlog(uuid: string, data: Omit<BlogItem, "uuid" | "createdAt" | "author">): Promise<BlogItem> {
        try {
            const res = await axios.patch(`${base}/blog/update/${uuid}`, data, {
                headers: this.getHeaders(),
            });
            return res.data;
        } catch (e) {
            throw this.createError(e);
        }
    }

    public static async deleteBlog(uuid: string): Promise<void> {
        try {
            await axios.delete(`${base}/blog/delete/${uuid}`, {
                headers: this.getHeaders(),
            });
        } catch (e) {
            throw this.createError(e);
        }
    }

    private static getHeaders() {
        const token = getSessionToken();

        if (!token) return {};

        return {
            Authorization: token,
        };
    }

    private static createError(e: unknown) {
        if (e instanceof AxiosError) {
            const errors = e.response?.data?.errors;

            if (e.status === 401) {
                removeSession();
                console.warn("Session expired, redirecting to login");
                window.location.pathname = "/login";
                return;
            }

            if (e.status === 404) {
                console.warn("Resource not found", e);
                window.location.pathname = "/404";
                return;
            }

            if (errors && e.status === 400 && hasErrorMessage("unknown session", errors) || hasErrorMessage("session expired", errors)) {
                removeSession();
                console.warn("Session expired, redirecting to login");
                // window.location.pathname = "/login";
                return;
            }

            throw new ApiError(e);
        }
        console.error("Unknown error api error", e);
        return new Error("Unknown API error");
    }
}
