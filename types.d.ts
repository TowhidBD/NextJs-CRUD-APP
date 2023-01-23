export type IUsers = {
    firstname: string;
    lastname: string;
    name: string;
    avatar: string;
    email: string;
    salary: number;
    status: string
}
export interface Data {
    name?: string;
    method?: string;
    error?: string | string[];
    successMessage?: string | string[];
    users?: Array<IUsers>
    user?: Array<IUsers>
    data?: Array<IUsers>
}