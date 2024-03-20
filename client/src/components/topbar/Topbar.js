import React from 'react'
import "./topbar.css"
import { Chat, Notifications, Person, Search } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Topbar() {
    const navigate = useNavigate();
    let user = {};
    if (Cookies.get('user') !== undefined) {
        user = JSON.parse(Cookies.get('user'));
    }
    console.log(user.username)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const logoutHandle = ()=>{
        Cookies.remove('user');
        console.log(Cookies.get('user'));
        // window.location.reload();
        navigate('/login');
      }
    return (
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <span className='logo' onClick={()=>{navigate('/')}}>
                    Socials
                </span>
            </div>
            <div className='topbarCenter'>
                <div className='searchbar'>
                    <Search className='searchIcon'/>
                    <input placeholder='Search for friend' className='searchInput' />
                </div>
            </div>
            <div className='topbarRight'>
                <div className='topbarLinks'>
                    <span className='topbarLink' onClick={()=>navigate('/')}>Homepage</span>
                    <span className='topbarLink'onClick={()=>navigate(`/profile/${user.username}`)}>Timeline</span>
                    <span className='topbarLink' onClick={logoutHandle}>Logout</span>
                </div>
                <div className='topbarIcons'>
                    <div className='topbarIconItem'>
                        <Person />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className='topbarIconItem'>
                        <Chat />
                        <span className='topbarIconBadge'>2</span>
                    </div>
                    <div className='topbarIconItem'>
                        <Notifications />
                        <span className='topbarIconBadge'>3</span>
                    </div>
                </div>
                <img crossorigin="anonymous" src={user.profilePicture ? PF+'api/image/'+user.profilePicture : PF+'images/person/noAvatar.png'} className='topbarImg' alt='' onClick={()=>navigate(`/profile/${user.username}`)}/>
            </div>
        </div>
    )
}

export default Topbar
