export interface ICategory {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
};

export interface ICategoryRes {
    success: boolean;
    message: string;
    data?: ICategory[];
    error?: any
}