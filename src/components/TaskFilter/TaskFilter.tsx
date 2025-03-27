import styles from "./TaskFilter.module.css";
import { useState } from "react";
import { TTaskFilter } from "../../types/task";
import Button from "../Button/Button";

interface TaskFilterProp {
    onChange: (filter: TTaskFilter) => void;
}

const TaskFilter = ({ onChange }: TaskFilterProp) => {
    const [filter, setFilter] = useState<TTaskFilter>("all");

    const handleClick = (filterValue: TTaskFilter) => {
        setFilter(filterValue);
        onChange(filterValue);
    };
    return (
        <div className={styles.filterControls}>
            <Button
                onClick={() => handleClick("all")}
                active={filter === "all"}
            >
                All
            </Button>

            <Button
                onClick={() => handleClick("active")}
                active={filter === "active"}
            >
                Active
            </Button>
            <Button
                onClick={() => handleClick("completed")}
                active={filter === "completed"}
            >
                Completed
            </Button>
        </div>
    );
};

export default TaskFilter;
