import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
    fetchUserTasks,
    updateTaskStatus,
    deleteTask,
} from "../../services/api";
import TaskList from "../../components/TaskList/TaskList";
import { ITask, TTaskFilter } from "../../types/task";
import { ApiError } from "../../types/api";
import Button from "../../components/Button/button";
import TaskFilter from "../../components/TaskFilter/TaskFilter";
import TaskCreator from "../../components/TaskCreator/TaskCreator";
import styles from "./TasksPage.module.css";

const TasksPage = () => {
    const { userId } = useParams<{ userId: string }>();
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [filter, setFilter] = useState<TTaskFilter>("all");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTasks = async () => {
            if (!userId) return;

            try {
                const data = await fetchUserTasks(parseInt(userId));
                setTasks(data);
            } catch (err) {
                const apiError = err as ApiError;
                setError(apiError.message);
            } finally {
                setLoading(false);
            }
        };

        getTasks();
    }, [userId]);

    const filteredTasks = useMemo(
        () =>
            tasks.filter((task) => {
                if (filter === "completed") return task.completed;
                if (filter === "active") return !task.completed;
                return true;
            }),
        [tasks, filter]
    );

    if (loading) return <div className="loading">Loading tasks...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="container">
            <Button to="/" active>
                ˂ Back
            </Button>

            <h1 className="h1">Tasks for User {userId}</h1>

            <TaskFilter onChange={(filter: TTaskFilter) => setFilter(filter)} />

            <TaskCreator
                userId={userId}
                onCreate={(newTask: ITask) =>
                    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }])
                }
                onError={() => setError(error)}
            />

            <TaskList
                tasks={tasks}
                filteredTasks={filteredTasks}
                onModifiedTask={(tasks: ITask[]) => setTasks([...tasks])}
                onError={() => setError(error)}
            />
        </div>
    );
};

export default TasksPage;
