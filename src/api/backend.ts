import type {
    AccountInfo,
    AuthorizationResponse,
    ErrorItem,
    LoginData,
    NewAccountData,
    Session,
    TodoItem,
} from "./types.ts";
import axios, { AxiosError } from "axios";

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
            if (e instanceof AxiosError) {
                throw new ApiError(e);
            }
            console.error("Unknown error while signing up", e);
            throw new Error("Unknown API error");
        }
    }

    public static async login(data: LoginData): Promise<AuthorizationResponse> {
        try {
            const res = await axios.post(`${base}/account/login`, data);
            handleSessionCreate(res.data);

            return res.data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new ApiError(e);
            }
            console.error("Unknown error while login", e);
            throw new Error("Unknown API error");
        }
    }

    public static async refreshSession() {
        try {
            const res = await axios.get(`${base}/session/refresh`, {
                headers: {
                    Authorization: `Bearer ${getSessionToken()}`,
                },
            });

            handleSessionCreate(res.data);

            return res.data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new ApiError(e);
            }
            console.error("Unknown error refreshing session", e);
            throw new Error("Unknown API error");
        }
    }

    public static async logout() {
        try {
            await axios.get(`${base}/session/revoke`, {
                headers: {
                    Authorization: `Bearer ${getSessionToken()}`,
                },
            });
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new ApiError(e);
            }
            console.error("Unknown error refreshing session", e);
            throw new Error("Unknown API error");
        } finally {
            removeSession();
        }
    }

    public static async fetchSessionInfo(): Promise<AccountInfo> {
        try {
            const res = await axios.get(`${base}/account/info`, {
                headers: {
                    Authorization: `Bearer ${getSessionToken()}`,
                },
            });
            return res.data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new ApiError(e);
            }
            console.error("Unknown error while login", e);
            throw new Error("Unknown API error");
        }
    }

    public static async createTodo(listUuid: string, data: { title: string }): Promise<TodoItem> {
        try {
            const res = await axios.post(`${base}/todo/create/${listUuid}`, data, {
                headers: {
                    Authorization: `Bearer ${getSessionToken()}`,
                },
            });

            return res.data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new ApiError(e);
            }
            console.error("Unknown error while login", e);
            throw new Error("Unknown API error");
        }
    }

    public static async updateTodo(listUuid: string, todoUuid: string, data: Partial<TodoItem>): Promise<TodoItem> {
        try {
            const res = await axios.patch(`${base}/todo/update/${listUuid}/${todoUuid}`, data, {
                headers: {
                    Authorization: `Bearer ${getSessionToken()}`,
                },
            });

            return res.data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new ApiError(e);
            }
            console.error("Unknown error while login", e);
            throw new Error("Unknown API error");
        }
    }

    public static async deleteTodo(listUuid: string, todoUuid: string): Promise<void> {
        try {
            await axios.delete(`${base}/todo/delete/${listUuid}/${todoUuid}`, {
                headers: {
                    Authorization: `Bearer ${getSessionToken()}`,
                },
            });
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new ApiError(e);
            }
            console.error("Unknown error while login", e);
            throw new Error("Unknown API error");
        }
    }
}
