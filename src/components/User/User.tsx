import { Link } from "react-router-dom";
import styles from "./User.module.css";
import { IUser } from "../../types/user";

interface UserProps {
    user: IUser;
    className?: string;
}

const User = ({ user, className }: UserProps) => {
    return (
        <Link
            to={`/tasks/${user.id}`}
            className={[styles.user, className].join(" ")}
        >
            <div className={styles.userName}>{user.name}</div>
            <div className={styles.userEmail}>{user.email}</div>
        </Link>
    );
};

export default User;
