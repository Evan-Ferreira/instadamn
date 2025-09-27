import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import UsersPage from './pages/users/page';
import UserPage from './pages/users/[id]/page';

function App() {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-200 sticky top-0 px-12 py-8 min-h-screen">
            <h3
                className="text-2xl font-medium absolute top-8 left-12 hover:cursor-pointer
             w-10 h-10 z-10"
                onClick={() => navigate('/users')}
            >
                Catbook
            </h3>
            <Routes>
                <Route path="/" element={<Navigate to="/users" />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/:username" element={<UserPage />} />
            </Routes>
        </div>
    );
}

export default App;
