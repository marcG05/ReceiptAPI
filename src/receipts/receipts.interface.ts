import { IUser } from "src/users/users.interface";

export interface ICategory {
    category_id: string;
    name: string;
    type: string;
    description: string;
};

export interface IReceiptLine {
    name: string;
    qty: number;
    price: string
};

export interface IReceipt {
    file_id?:string;
    project_id: string;
    user_id: string;
    receipt_id:string;
    entry_date: Date;
    total: string;
    description: string;
    user: IUser;
    category: ICategory;
    lines: IReceiptLine[];
};