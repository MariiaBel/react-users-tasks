export interface ITask {
    userId: number;
    id: number | string;
    title: string;
    completed: boolean;
}

export type TTaskFilter = 'all' | 'active' | 'completed';