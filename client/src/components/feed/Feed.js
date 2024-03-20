import React, { useState, useEffect } from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext)
  // console.log(user);


  useEffect(() => {
    const fetchPost = async () => {
      const fetchData = username
        ? await fetch('https://social-try.onrender.com/api/post/profile/' + username, {
          mode: 'no-cors',
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        })
        : await fetch('https://social-try.onrender.com/api/post/timeline/' + user._id, {
          mode: 'no-cors',
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        })
      const data = await fetchData.json();
      setPosts(data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
      // console.log(data);
    }
    fetchPost();
    // console.log(posts); 
  }, [username, user._id])

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {(!username || username === user.username) && <Share/>}
        {posts.map(elem => (
          <Post key={elem._id} post={elem} />
        ))}
      </div>
    </div>
  )
}

export default Feed
