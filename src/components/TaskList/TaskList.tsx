import Task from "../Task/Task";
import styles from "./TaskList.module.css";
import { ITask } from "../../types/task";
import { updateTaskStatus } from "../../services/api";
import { ApiError } from "../../types/api";
import { deleteTask } from "./../../services/api";

interface TaskListProps {
    tasks: ITask[];
    filteredTasks: ITask[];
    onModifiedTask: (tasks: ITask[]) => void;
    onError: (error: string) => void;
}

const TaskList = ({
    tasks,
    filteredTasks,
    onError,
    onModifiedTask,
}: TaskListProps) => {
    if (!tasks.length)
        return <div className={styles.empty}>No tasks found</div>;

    const handleToggleStatus = async (taskId: number, completed: boolean) => {
        try {
            onModifiedTask(
                tasks.map((task) =>
                    task.id === taskId
                        ? { ...task, completed: !completed }
                        : task
                )
            );
            await updateTaskStatus(taskId, !completed);
        } catch (err) {
            const apiError = err as ApiError;
            onError(apiError.message);
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        try {
            onModifiedTask(tasks.filter((task) => task.id !== taskId));
            await deleteTask(taskId);
        } catch (err) {
            const apiError = err as ApiError;
            onError(apiError.message);
        }
    };

    return (
        <ul className={styles.taskList}>
            {filteredTasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onToggleStatus={handleToggleStatus}
                    onDelete={handleDeleteTask}
                />
            ))}
        </ul>
    );
};

export default TaskList;
