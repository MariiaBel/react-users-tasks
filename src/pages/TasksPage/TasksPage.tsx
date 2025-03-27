import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserTasks } from "../../services/api";
import TaskList from "../../components/TaskList/TaskList";
import { ITask, TTaskFilter } from "../../types/task";
import { ApiError } from "../../types/api";
import Button from "../../components/Button/Button";
import TaskFilter from "../../components/TaskFilter/TaskFilter";
import TaskCreator from "../../components/TaskCreator/TaskCreator";

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
                onCreate={(newTask: ITask) => setTasks([...tasks, newTask])}
                onError={() => setError(error)}
            />

            <TaskList
                tasks={tasks}
                filter={filter}
                onModifiedTask={(tasks: ITask[]) => setTasks(tasks)}
                onError={() => setError(error)}
            />
        </div>
    );
};

export default TasksPage;
