import styles from "./Task.module.css";
import { ITask } from "../../types/task";

interface TaskProps {
    task: ITask;
    onToggleStatus: (taskId: number | string, completed: boolean) => void;
    onDelete: (taskId: number | string) => void;
    className?: string;
}

const Task = ({ task, className, onToggleStatus, onDelete }: TaskProps) => {
    return (
        <li
            className={`${styles.task} ${className || ""} ${
                task.completed ? styles.completed : ""
            }`}
        >
            <input
                id={`item-${task.id}`}
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleStatus(task.id, task.completed)}
                className={styles.checkbox}
            />
            <label htmlFor={`item-${task.id}`} className={styles.title}>
                {task.title}
            </label>
            <button
                onClick={() => onDelete(task.id)}
                className={styles.deleteBtn}
                aria-label="Delete task"
            >
                ×
            </button>
        </li>
    );
};

export default Task;
