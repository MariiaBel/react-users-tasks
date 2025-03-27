import Task from "../Task/Task";
import styles from "./TaskList.module.css";
import { ITask, TTaskFilter } from "../../types/task";
import { updateTaskStatus } from "../../services/api";
import { ApiError } from "../../types/api";
import { deleteTask } from "./../../services/api";
import { useMemo } from "react";

interface TaskListProps {
    tasks: ITask[];
    filter: TTaskFilter;
    onModifiedTask: (tasks: ITask[]) => void;
    onError: (error: string) => void;
}

const TaskList = ({
    tasks,
    filter,
    onError,
    onModifiedTask,
}: TaskListProps) => {
    if (!tasks.length)
        return <div className={styles.empty}>No tasks found</div>;

    const filteredTasks = useMemo(
        () =>
            tasks.filter((task) => {
                if (filter === "completed") return task.completed;
                if (filter === "active") return !task.completed;
                return true;
            }),
        [tasks, filter]
    );

    const handleToggleStatus = async (
        taskId: number | string,
        completed: boolean
    ) => {
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

    const handleDeleteTask = async (taskId: number | string) => {
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
