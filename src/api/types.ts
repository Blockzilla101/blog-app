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
    email: string;
    avatar?: string;
    bio: string;
    blogUuids: string[];
}

export type PartialAccountInfo = Omit<AccountInfo, "blogUuids" | "email">;

export interface BlogList {
    blogs: BlogItem[];
    hasNext: boolean;
    next: string | null;
    total: number;
}

export interface BlogItem {
    uuid: string;
    title: string;
    content: string;
    createdAt: number;
    author: PartialAccountInfo;
}

export interface Session {
    token: string;
    expiresAt: number;
}

export interface AuthorizationResponse {
    account: AccountInfo;
    session: Session;
}