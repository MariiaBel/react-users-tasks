import { User } from './user';
import { Task } from './task';

export type ApiResponse<T> = {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
};

export interface ApiError {
    message: string;
    code?: string;
    response?: {
        status: number;
        data: any;
    };
}