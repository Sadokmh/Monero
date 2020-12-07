import { Role } from './Role';

export interface User {
    id?: string
    first_name: string,
    last_name: string,
    email: string,
    role: Role,
    is_active: boolean,
    createdAt?: string,
    updatedAt?: string
}