import axios, { AxiosResponse } from 'axios';
import { IUser } from '../types/user';
import { ITask } from '../types/task';
import { ApiResponse, ApiError } from '../types/api';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<IUser[]> => {
    try {
        const response: AxiosResponse<IUser[]> = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const fetchUserTasks = async (userId: number): Promise<ITask[]> => {
    try {
        const response: AxiosResponse<ITask[]> = await axios.get(
            `${API_URL}/todos?userId=${userId}`
        );
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const addTask = async (task: Omit<ITask, 'id'>): Promise<ITask> => {
    try {
        const response: AxiosResponse<ITask> = await axios.post(
            `${API_URL}/todos`,
            task
        );
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const updateTaskStatus = async (
    taskId: number,
    completed: boolean
): Promise<ITask> => {
    try {
        const response: AxiosResponse<ITask> = await axios.patch(
            `${API_URL}/todos/${taskId}`,
            { completed }
        );
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const deleteTask = async (taskId: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/todos/${taskId}`);
    } catch (error) {
        throw handleApiError(error);
    }
};

const handleApiError = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
        return {
            message: error.message,
            code: error.code,
            response: error.response
                ? {
                    status: error.response.status,
                    data: error.response.data,
                }
                : undefined,
        };
    }
    return {
        message: 'An unknown error occurred',
    };
};