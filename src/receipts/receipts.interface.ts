import { IUser } from "src/users/users.interface";

export interface ICategory {
    category_id: string;
    name: string;
    type: string;
    description: string;
};

export interface IReceiptLine {};

export interface IReceipt {
    receipt_id:string;
    entry_date: Date;
    total: string;
    user: IUser;
    category: ICategory;
    lines: IReceiptLine[];
};