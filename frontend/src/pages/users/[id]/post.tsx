import type { Post as PostType } from '../../../utils/types';

interface PostProps {
    post: PostType;
    liked: boolean;
    onLike: (post: PostType, action: 'like' | 'unlike') => void;
}

export const Post = ({ post, liked, onLike }: PostProps) => {
    return (
        <div
            key={post.id}
            className="rounded-xl w-164 py-6 max-h-164 flex flex-col relative
     bg-gray-100 shadow-md border border-gray-200"
        >
            <div className="overflow-hidden w-full h-max-164">
                <img
                    src={`http://localhost:3000/public/images/${post.photo}`}
                    alt={post.caption}
                    className="object-fill w-full h-full"
                />
            </div>
            <div className="flex items-center justify-between px-4 mt-4">
                <div className="flex items-center gap-1">
                    <svg
                        className={`w-6 h-6  cursor-pointer hover:text-red-600 inline-block active:scale-170 transform transition-all duration-300 ease-in-out ${
                            liked ? 'text-red-500' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        onClick={() => {
                            onLike(post, liked ? 'unlike' : 'like');
                        }}
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <p>{post.likes}</p>
                </div>
            </div>
            <p className="italic px-4">{post.caption}</p>
        </div>
    );
};
