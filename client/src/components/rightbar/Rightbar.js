import React, { useContext, useEffect, useState } from 'react'
import './rightbar.css'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Add , Edit, Remove} from '@mui/icons-material';
import EditModal from '../edit/EditModal';

function Rightbar({ user }) {
  const navigate = useNavigate();
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER
  const [friends, setFriends] = useState([]);
  const { user: currentuser } = useContext(AuthContext);
  const [shouldRunEffect, setShouldRunEffect] = useState(true);
  const [followed,setFollowed] = useState(false);
  useEffect(()=>{
    setFollowed(currentuser.followings.includes(user?._id));
    console.log(currentuser.followings.includes(user?._id));
  },[followed])
  useEffect(() => {
    if (shouldRunEffect ) {
      try {
        const getFriends = async () => {
          const endpoint = user ? `https://social-try.onrender.com/api/user/friends/${user._id}` : `/user/friends/${currentuser._id}`
          const fetchData = await fetch(endpoint, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          })
          // setFriends([]);
          if (fetchData.status === 200) {
            const friendList = await fetchData.json();
            setFriends(friendList);
            setShouldRunEffect(false);
          }
        }
        getFriends();

      } catch (err) {
        console.log(err)
      }
    }
    else
      return () => { };
  })

  const handelFollow = async()=>{
    try{
      followed 
      ? await fetch('https://social-try.onrender.com/api/user/'+ user._id +'/unfollow', {
        mode: 'no-cors',
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({userId : currentuser._id})
      })
      : await fetch('https://social-try.onrender.com/api/user/'+ user._id +'/follow', {
        mode: 'no-cors',
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({userId : currentuser._id})
      })
    }catch(err){
      console.log(err);
    }
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className='birthdayContainer'>
          <img className='birthdayImg' crossorigin="anonymous" src={`${publicFolder}images/gift.png`} alt='' />
          <span className='birthdayText'>
            <b>Pola Foster</b> and <b>3 other friends</b> have a bithday today.
          </span>
        </div>
        <img className='rightbarAd' crossorigin="anonymous" src={`${publicFolder}images/ad.png`} alt='' />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className='rightbarFriendList'>
          {friends.map(elem => (
            <li className='rightbarFriend' onClick={() => navigate(`/profile/${elem.username}`)}>
              <div className='rightbarProfileImgContainer'>
                <img className='rightbarProfileImg' crossorigin="anonymous" src={elem.profilePicture ? publicFolder + 'api/image/'+ elem.profilePicture : publicFolder + 'images/person/noAvatar.png'} alt='' />
                <span className='rightbarOnline'></span>
              </div>
              <span className='rightbarUsername'>{elem.username}</span>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentuser.username && (
        <button className='rightbarFollowButton' onClick={handelFollow}>
        {followed?"Unfollow":"Follow"}
        {followed?<Remove/>:<Add/>}
        </button>)}
        {user.username === currentuser.username && (
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#EditModal"><Edit/><EditModal />Edit profile</button>)}
        <h4 className='rightbarProfileTitle'>User Information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City:</span>
            <span className='rightbarInfoValue'>{user.city}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From:</span>
            <span className='rightbarInfoValue'>{user.from}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship:</span>
            <span className='rightbarInfoValue'>{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "Other"}</span>
          </div>
        </div>
        <div>
          <h4 className='rightbarProfileTitle'>User Friends</h4>
          <div className='rightbarFollowings'>
            {friends.map((elem) => {
              return (
                <div className='rightbarFollowing' onClick={() => {setShouldRunEffect(true) ; navigate(`/profile/${elem.username}`);}}>
                  <img className='rightbarFollowingImg' crossorigin="anonymous" src={elem.profilePicture ? publicFolder + 'api/image/' + elem.profilePicture : publicFolder + 'images/person/noAvatar.png'} alt='' />
                  <span className='rightbarFollowingName'>{elem.username}</span>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar
