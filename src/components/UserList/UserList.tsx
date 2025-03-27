import User from "../User/User";
import styles from "./UserList.module.css";
import { IUser } from "../../types/user";

interface UserListProps {
    users: IUser[];
}

const UserList = ({ users }: UserListProps) => {
    return (
        <div className={styles.userList}>
            {users.map((user) => (
                <User key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UserList;
