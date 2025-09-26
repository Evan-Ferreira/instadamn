import { Routes, Route, Navigate } from 'react-router-dom';
import UsersPage from './pages/users/page';
import UserPage from './pages/users/[id]/page';

function App() {
    return (
        <div className="px-24 py-12 bg-gray-200 sticky min-h-screen h-full">
            <Routes>
                <Route path="/" element={<Navigate to="/users" />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/:username" element={<UserPage />} />
            </Routes>
        </div>
    );
}

export default App;
