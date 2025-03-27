import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../services/api";
import UserList from "../../components/UserList/UserList";
import styles from "./UsersPage.module.css";
import { IUser } from "../../types/user";
import { ApiError } from "../../types/api";

const UsersPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                const apiError = err as ApiError;
                setError(apiError.message);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="container">
            <h1 className="h1">Users</h1>
            <UserList users={users} />
        </div>
    );
};

export default UsersPage;
