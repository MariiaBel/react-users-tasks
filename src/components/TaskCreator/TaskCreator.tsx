import Button from "../Button/Button";
import styles from "./TaskCreator.module.css";
import { useState } from "react";
import { ITask } from "../../types/task";
import { addTask } from "../../services/api";
import { ApiError } from "../../types/api";

interface TaskCreatorProps {
    onCreate: (task: ITask) => void;
    onError: (error: string) => void;
    userId?: string;
}

const TaskCreator = ({ userId, onCreate, onError }: TaskCreatorProps) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");

    const generateId = () => crypto.randomUUID();

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim() || !userId) return;

        try {
            const newTask = {
                userId: parseInt(userId),
                title: newTaskTitle,
                completed: false,
            };

            const addedTask = await addTask(newTask);
            onCreate({ ...addedTask, id: generateId() });
            setNewTaskTitle("");
        } catch (err) {
            const apiError = err as ApiError;
            onError(apiError.message);
        }
    };

    return (
        <form onSubmit={handleAddTask} className={styles.form}>
            <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="New task title"
                className={styles.taskInput}
            />
            <Button type="submit" active>
                Add Task
            </Button>
        </form>
    );
};

export default TaskCreator;
