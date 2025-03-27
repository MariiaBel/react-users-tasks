export interface ITask {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export type TTaskFilter = 'all' | 'active' | 'completed';