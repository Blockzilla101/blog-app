export interface NewAccountData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ErrorItem {
    location: string;
    msg: string;
    path: string;
    type: string;
    value: string | number;
}

export interface AccountInfo {
    uuid: string;
    firstName: string,
    lastName: string,
    todoLists: TodoList[]
}

export interface TodoList {
    uuid: string;
    name: string;
    items: TodoItem[];
}

export interface TodoItem {
    uuid: string;
    title: string;
    completed: boolean;
}

export interface Session {
    token: string;
    expiresAt: number;
}

export interface AuthorizationResponse {
    account: Pick<AccountInfo, "firstName" | "lastName">;
    session: Session;
}