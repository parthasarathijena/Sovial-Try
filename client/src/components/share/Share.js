import React, { useRef, useState } from 'react'
import './share.css'
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@mui/icons-material'
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';


function Share() {
    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }
        if (file) {
            console.log(file);
            let formdata = new FormData();
            const fileName = Date.now() + file.name;
            const newFile = new File([file], fileName);
            console.log(newFile);
            formdata.append("file", newFile);
            newPost.img = fileName
            console.log(formdata.get('name'))
            try {
                const uploadPost = async () => {
                    await fetch('https://social-try.onrender.com/api/upload', {
                        mode: 'no-cors',
                        method: 'POST',
                        body: formdata
                    })
                }
                uploadPost();
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const postUser = async () => {
                await fetch('https://social-try.onrender.com/api/post/', {
                    mode: 'no-cors',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    }, body: JSON.stringify(newPost)
                })
            }
            postUser();
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='share'>
            <div className='shareWrapper'>
                <div className='shareTop'>
                    <img className='shareProfileImg' crossorigin="anonymous" src={user.profilePicture ? PF + 'api/image/' + user.profilePicture : PF + 'images/person/noAvatar.png'} alt='' />
                    <input ref={desc} placeholder={"What's in your mind " + user.username + "?"} className='shareInput'></input>
                </div>
                <hr className='shareHr' />
                {file && (
                    <div className='shareImgContainer'>
                        <img className='shareImg' src={URL.createObjectURL(file)} alt='' />
                        <Cancel className='shareCancelImg' onClick={() => setFile(null)} />
                    </div>
                )}
                <form className='shareBottom' onSubmit={submitHandler}>
                    <div className='shareOptions'>
                        <label htmlFor='file' className='shareOption'>
                            <PermMedia htmlColor="red" className='shareIcon' />
                            <span className='shareOptionText'>Photo or Video</span>
                            <input style={{ display: 'none' }} type='file' id='file' accept='.png,.jpeg,.jpg' onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className='shareOption'>
                            <Label htmlColor="blue" className='shareIcon' />
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className='shareOption'>
                            <Room htmlColor="green" className='shareIcon' />
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className='shareOption'>
                            <EmojiEmotions htmlColor="goldenrod" className='shareIcon' />
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </div>
                    <button className='shareButton' type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share
