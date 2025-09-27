import type { User } from '../utils/types';

const UserListItem = ({
    firstName,
    lastName,
    profile_picture,
    username,
    bio,
    className,
    onClick,
}: User & { className?: string; onClick?: () => void }) => {
    return (
        <div
            className={`w-full h-32 flex gap-6 px-6 py-4 ${className} border-gray-200 hover:cursor-pointer hover:bg-gray-300
            transition-colors duration-300 ease-in-out`}
            onClick={onClick}
        >
            <div className="flex flex-col w-fit justify-end gap-1">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                        src={`http://localhost:3000/public/images/${profile_picture}`}
                        alt={`${firstName} ${lastName}`}
                        className="w-full h-full object-fill"
                    />
                </div>
                <p className="ml-2 text-sm text-gray-500">@{username}</p>
            </div>
            <div className="flex flex-col w-fit justify-center">
                <h3 className="text-lg font-semibold">
                    {firstName} {lastName}
                </h3>
                <p className="text-sm text-gray-500">{bio}</p>
            </div>
        </div>
    );
};

export default UserListItem;
