import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Post as PostType } from '../../../utils/types';
import { Post } from './post';

const Page = () => {
    const { username } = useParams();
    const [userPosts, setUserPosts] = useState<PostType[] | null>(null);
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

    const handleLike = async (post: PostType, action: 'like' | 'unlike') => {
        try {
            const response = await fetch(
                `http://localhost:3000/users/${post.username}/posts/${post.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: action,
                    }),
                }
            ).then((response) => response.json());
            if (response.success) {
                setUserPosts(
                    (prevPosts) =>
                        prevPosts?.map((p) =>
                            p.id === post.id
                                ? { ...p, likes: response.data.likes }
                                : p
                        ) || null
                );
                setLikedPosts((prev) => {
                    const newSet = new Set(prev);
                    if (action === 'like') {
                        newSet.add(post.id);
                    } else {
                        newSet.delete(post.id);
                    }
                    return newSet;
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const getUser = async (username: string) => {
            try {
                const response = await fetch(
                    `http://localhost:3000/users/${username}`
                ).then((response) => response.json());
                setUserPosts(response);
            } catch (error) {
                console.error(error);
            }
        };
        if (username) {
            getUser(username);
        }
    }, [username]);

    if (!userPosts) {
        return <div>Loading...</div>;
    }
    return (
        <div className="flex flex-col items-center justify-start gap-4">
            {userPosts.map((post) => (
                <Post
                    key={post.id}
                    post={post}
                    liked={likedPosts.has(post.id)}
                    onLike={handleLike}
                />
            ))}
        </div>
    );
};

export default Page;
