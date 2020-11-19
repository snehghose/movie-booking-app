export interface User {
    username: string;
    email: string;
    role: Role;
    password: string;
    bookings?: Array<string>
}

export enum Role {
    ROLE_CUSTOMER = 'ROLE_CUSTOMER', 
    ROLE_ADMIN = 'ROLE_ADMIN'
}