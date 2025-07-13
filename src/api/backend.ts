import type { AccountInfo, ErrorItem, LoginData, NewAccountData, TodoItem } from "./types.ts";
import axios, { AxiosError } from "axios";

const base = import.meta.env.VITE_API_BASE;

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
    public static async signUp(data: NewAccountData) {
        try {
            const res = await axios.post(`${base}/account/sign-up`, data);

            // todo handle session creation

            console.log(res.data);
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new ApiError(e);
            }
            console.error("Unknown error while signing up", e);
            throw new Error("Unknown API error");
        }
    }

    public static async login(data: LoginData) {
        try {
            const res = await axios.post(`${base}/account/login`, data);

            // todo handle session creation

            console.log(res.data);
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new ApiError(e);
            }
            console.error("Unknown error while login", e);
            throw new Error("Unknown API error");
        }
    }

    public static async refreshSession() {
        throw new Error("not implemented");
    }

    public static async logout() {
        throw new Error("not implemented");
    }

    public static async fetchSessionInfo(): Promise<AccountInfo> {
        try {
            // todo use session token
            const res = await axios.get(`${base}/account/info`);
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
            // todo use session token
            const res = await axios.post(`${base}/todo/create/${listUuid}`, data);
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
            // todo use session token
            const res = await axios.patch(`${base}/todo/update/${listUuid}/${todoUuid}`, data);
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
            // todo use session token
            await axios.delete(`${base}/todo/delete/${listUuid}/${todoUuid}`);
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new ApiError(e);
            }
            console.error("Unknown error while login", e);
            throw new Error("Unknown API error");
        }
    }
}
