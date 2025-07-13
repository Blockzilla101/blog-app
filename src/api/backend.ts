import type { ErrorItem, LoginData, NewAccountData } from "./types.ts";
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
}