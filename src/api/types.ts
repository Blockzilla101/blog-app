export interface NewAccountData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface ErrorItem {
    location: string;
    msg: string;
    path: string;
    type: string;
    value: string | number;
}