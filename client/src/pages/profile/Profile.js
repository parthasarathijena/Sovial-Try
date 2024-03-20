
import React, { useState, useEffect } from 'react'
import './profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
import { useParams } from 'react-router-dom'

function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({})
    const params = useParams();
    const username = params.username;
    useEffect(() => {
        const fetchUser = async () => {
            const fetchData = await fetch(`https://social-try.onrender.com/api/user?username=${username}`, {
                mode: 'no-cors',
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await fetchData.json();
            setUser(data);
        }
        fetchUser();
    }, [username])
    return (
        <>
            <Topbar />
            <div className='profile'>
                <Sidebar />
                <div className='profileRight'>
                    <div className='profileRightTop'>
                        <div className='profileCover'>
                            <img className='profileCoverImg' crossorigin="anonymous" src={user.coverPicture ? PF + 'api/image/' +user.coverPicture : PF + 'images/person/noCover.jpg'} alt='' />
                            <img className='profileUserImg' crossorigin="anonymous" src={user.profilePicture ? PF + 'api/image/' +user.profilePicture : PF + 'images/person/noAvatar.png'} alt='' />
                        </div>
                        <div className='profileInfo'>
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <span className='profileInfoDesc'>{user.desc}</span>
                        </div>
                    </div>
                    <div className='profileRightBottom'>
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
