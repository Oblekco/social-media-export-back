export interface User {
    id: number;
    email: string;
    username: string;
    rol: "ADMIN" | "CLIENT";
    token?: string;
}

export interface UserToken {
    token?: string;
}

export interface DecodedToken {
    id: number;
    iat: number;
}
