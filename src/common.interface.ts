export interface IError{
    status_code: number;
    message: string;
    service: string;
    params?: string[];
};

export interface IAction{
    status_code: number;
    message: string;
    confirmed: boolean;
    arguments?: string[];
}