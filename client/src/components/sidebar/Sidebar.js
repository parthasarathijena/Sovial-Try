import React, { useEffect, useState } from 'react'
import './sidebar.css'
import { School, Event, WorkOutline, HelpOutline, Bookmark, Group, PlayCircleFilled, Chat, RssFeed } from '@mui/icons-material'


function Sidebar() {
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER
    const [allUser, setAllUser] = useState([]);


    useEffect(() => {
        const fetchUser = async () => {
            const fetchData = await fetch('https://social-try.onrender.com/api/user/all', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await fetchData.json();
            setAllUser(data);
        }
        fetchUser();
    }, [allUser.length])
    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <ul className='sidebarList'>
                    <li className='sidebarListItem'>
                        <RssFeed className='sidebarListItemIcon' />
                        <span className='sidebarListItemText'>Feed</span>
                    </li>
                    <li className='sidebarListItem'>
                        <Chat className='sidebarListItemIcon' />
                        <span className='sidebarListItemText'>Chats</span>
                    </li>
                    <li className='sidebarListItem'>
                        <PlayCircleFilled className='sidebarListItemIcon' />
                        <span className='sidebarListItemText'>Videos</span>
                    </li>
                    <li className='sidebarListItem'>
                        <Group className='sidebarListItemIcon' />
                        <span className='sidebarListItemText'>Groups</span>
                    </li>
                    <li className='sidebarListItem'>
                        <Bookmark className='sidebarListItemIcon' />
                        <span className='sidebarListItemText'>Bookmarks</span>
                    </li>
                    <li className='sidebarListItem'>
                        <HelpOutline className='sidebarListItemIcon' />
                        <span className='sidebarListItemText'>Questions</span>
                    </li>
                    <li className='sidebarListItem'>
                        <WorkOutline className='sidebarListItemIcon' />
                        <span className='sidebarListItemText'>Jobs</span>
                    </li>
                    <li className='sidebarListItem'>
                        <Event className='sidebarListItemIcon' />
                        <span className='sidebarListItemText'>Events</span>
                    </li>
                    <li className='sidebarListItem'>
                        <School className='sidebarListItemIcon' />
                        <span className='sidebarListItemText'>Courses</span>
                    </li>
                </ul>
                <button className='sidebarButton'>Show More</button>
                <hr className='sidebarHr' />
                <ul className='sidebarFriendList'>
                    {allUser.map(elem => {
                        return (
                            <li className='sidebarFriend'>
                                <img className='sidebarFriendImg' crossorigin="anonymous" src={elem.profilePicture ? publicFolder + 'api/image/' + elem.profilePicture : publicFolder +'images/person/noAvatar.png'} alt='' />
                                <span className='sidebarFriendName'>{elem.username}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
