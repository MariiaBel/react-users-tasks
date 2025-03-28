import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersPage from "./pages/UsersPage/UsersPage";
import TasksPage from "./pages/TasksPage/TasksPage";

function App() {
    const basename = import.meta.env.PROD ? "/react-users-tasks/dist/" : "/";

    return (
        <Router basename={basename}>
            <Routes>
                <Route path="/" element={<UsersPage />} />
                <Route path="/tasks/:userId" element={<TasksPage />} />
            </Routes>
        </Router>
    );
}

export default App;
