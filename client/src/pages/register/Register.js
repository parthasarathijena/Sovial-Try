import React, { useEffect, useState } from 'react'
import './register.css'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Register() {
    const navigate = useNavigate();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const cpassword = useRef();
    const [user,setUser] = useState();
    useEffect(()=>{
        setUser(Cookies.get('user'));
    },[user])

    if(user){
        const navHome = ()=>navigate('/');
        navHome();
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        if(password.current.value!==cpassword.current.value){
            cpassword.current.setCustomValidity("Password don't match!");
        }else{
            const user = {
                username : username.current.value,
                email : email.current.value,
                password : password.current.value,
            }
            try{
                await fetch('https://social-try.onrender.com/api/auth/register',{
                    method:"POST",
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify(user)
                });
                const navlogin = ()=>{navigate('/login')};
                navlogin();
            }catch(err){
                console.log(err);
            }
        }
    } 
    return (
        <div className='register'>
            <div className='registerWrapper'>
                <div className='registerLeft'>
                    <h3 className='registerLogo'>Socials</h3>
                    <span className='registerDesc'>Connect with friends and the world around you on Socials.</span>
                </div>
                <div className='registerRight'>
                    <form className='registerBox' onSubmit={handleClick}>
                        <input placeholder='Username' required className='registerInput'  ref={username} />
                        <input placeholder='Email' type='email' required className='registerInput'  ref={email} />
                        <input placeholder='Password' type='password' required minLength={6} className='registerInput'  ref={password} />
                        <input placeholder='Password Again' type='password' required minLength={6} className='registerInput'  ref={cpassword} />
                        <button className='registerButton' type='submit'>Sign Up</button>
                        <button className='registerLogin'  onClick={()=>{navigate('/login');}}>Login into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
