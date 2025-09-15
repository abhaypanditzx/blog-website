import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import CreatePost from './CreatePost'
import { useCustomHook } from '../contexts/GlobalContext';
import { FaHeart } from "react-icons/fa"; // ❤️ icon
import Comments from './Comments';
const Posts = () => {
    const { posts, setPosts } = useCustomHook();
    const {API,userName} =  useCustomHook()
    const [comment, setComment] = useState([])
    // const userName = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get(`${API}/posts`);
                setPosts(response.data)
          
            } catch (err) {
                console.log(err)
            }
        }
        getPosts();
    }, [])

    const handleDelete = async (id) => {
        try {
            const deleted = await axios.delete(`${API}/posts/${id}`,{data:{username:userName}})
            console.log('post deleted', deleted.data)
            setPosts(posts.filter(p => p._id !== id))

        } catch (err) {
            console.error("failed to delete post",err)
        }
    }

    const handleLike = async (id) => {

        try {
            const response = await axios.post(`${API}/posts/like`, { id,username:userName })
            setPosts(posts.map(p => p._id === id ? response.data.post : p));
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='parent-posts'>
            <CreatePost />
            <div className='child-posts'>
                {
                    posts.length === 0 ? (
                        <div> no posts </div>
                    ) :
                        (
                            posts.map((post) => (

                                <div key={post._id}>
                                    <div className='post' >
                                        {post.author === userName || userName === 'admin' ? <MdDelete className='delete' onClick={() => handleDelete(post._id)} /> : ''}
                                        <div className='author-date'>
                                            <i>author:{post.author}</i>
                                            <small style={{ color: "grey" }}>
                                                {new Date(post.createdAt).toLocaleString('en-IN', {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short'
                                                })}
                                            </small>
                                        </div>
                                        <div style={{ fontSize: '20px', padding: "10px", background: "white", width: '100%' }}>
                                            <p>
                                                {post.post}
                                            </p>
                                        </div>
                                        <div className="postBottom">
                                            <div id="heartLogo" style={{ display: "flex", alignItems: "center" }}>
                                                <FaHeart
                                                    onClick={() => handleLike(post._id)}
                                                    style={{
                                                        color: (post.likes && post.likes.includes(userName)) ? 'red' : 'grey'
                                                    }} />{post.likes.length}
                                            </div>
                                        </div>

                                    </div>
                                    <div>
                                        <Comments post={post} />
                                    </div>
                                </div>
                            )
                            )
                        )
                }
            </div>
        </div>
    )
}

export default Posts

