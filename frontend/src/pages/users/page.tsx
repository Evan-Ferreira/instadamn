import { useEffect, useState, useRef, useMemo } from 'react';
import type { Users } from '../../utils/types';
import UserListItem from '../user-list-item';
import { useNavigate } from 'react-router-dom';

const Page = () => {
    const [users, setUsers] = useState<Users | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');

    const navigate = useNavigate();
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/users'
                ).then((response) => response.json());
                setUsers(response);
            } catch (error) {
                console.error(error);
            }
        };
        getUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        if (!users) return {};
        if (!searchValue) return users;
        const editedSearchValue = searchValue.toLowerCase().trim();
        return Object.entries(users).reduce(
            (acc, [username, userAtrributes]) => {
                if (
                    username.toLowerCase().trim().includes(editedSearchValue) ||
                    userAtrributes.firstName
                        .toLowerCase()
                        .trim()
                        .includes(editedSearchValue) ||
                    userAtrributes.lastName
                        .toLowerCase()
                        .trim()
                        .includes(editedSearchValue) ||
                    userAtrributes.bio
                        .toLowerCase()
                        .trim()
                        .includes(editedSearchValue)
                ) {
                    acc[username] = userAtrributes;
                }
                return acc;
            },
            {} as Users
        );
    }, [searchValue, users]);

    return (
        <div className="flex flex-col justify-center mx-auto my-6 w-164 gap-4">
            <input
                type="text"
                placeholder="Search for anything..."
                className="w-full rounded-xl border placeholder:text-sm text-sm text-gray-500 border-gray-200 bg-gray-100 px-6 py-3 focus:border-gray-300 focus:outline-none"
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="showdow-lg border border-gray-200 bg-gray-100 rounded-xl overflow-hidden">
                {Object.entries(filteredUsers ?? {}).map(
                    ([username, userAtrributes], index) => (
                        <UserListItem
                            key={username}
                            {...userAtrributes}
                            username={username}
                            className={
                                index ===
                                Object.keys(filteredUsers ?? {}).length - 1
                                    ? 'border-b-0'
                                    : 'border-b'
                            }
                            onClick={() => {
                                navigate(`/users/${username}`);
                            }}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Page;
