import React, { useState, useEffect, useContext } from 'react'
import './post.css'
import { MoreVert } from '@mui/icons-material'
import { format } from 'timeago.js'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Post({ post }) {
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext);
  // let profilePictue,userName
  // Users.map(elem=>{
  //   if(post.userId===elem.id){
  //     profilePictue = elem.profilePicture
  //     userName = elem.username
  //   }
  // })
  // console.log(post.like)
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id))
  const [user, setUser] = useState({})
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER


  useEffect(() => {

    const fetchUser = async () => {
      const fetchData = await fetch('https://social-try.onrender.com/api/user?userId=' + post.userId, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await fetchData.json();
      // console.log(data);
      setUser(data);
    }
    fetchUser();
  }, [post.userId])


  const likeHandler = () => {
    try {
      const likeUser = async () => {
        await fetch('https://social-try.onrender.com/api/post/' + post._id + '/like', {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          }, body: JSON.stringify({
            userId: currentUser._id
          })
        })
      }
      likeUser();
    } catch (err) {
      console.log(err)
    }
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }
  // console.log(Users.filter(elem=>elem.id === post.userId)[0].profilePicture)
  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft' onClick={() => navigate(`/profile/${user.username}`)}>
            <img className='postProfileImg' src={user.profilePicture ? publicFolder + user.profilePicture : publicFolder + 'person/noAvatar.png'} alt='' />
            <span className='postUserName'>{user.username}</span>
            <span className='postDate'>{format(post.createdAt)}</span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post?.desc}</span>
          <img className='postImg' src={publicFolder + post.img} alt='' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img className='likeIcon' onClick={likeHandler} src={`${publicFolder}/like.png`} alt='' />
            <img className='likeIcon' onClick={likeHandler} src={`${publicFolder}/heart.png`} alt='' />
            <span className='postLikeCounter'>{like} people like it</span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post