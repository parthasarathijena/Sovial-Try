import React, { useContext, useEffect, useRef, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';

function Login() {
    const navigate = useNavigate();

    const email = useRef();
    const password = useRef();
    const [user,setUser] = useState();
    // const user = Cookies.get('user');
    const { dispatch } = useContext(AuthContext)


    useEffect(()=>{
        setUser(Cookies.get('user'));
    },[user])
    const handleClick = async (e) => {
        e.preventDefault();
        await loginCall({ email: email.current.value, password: password.current.value }, dispatch);
        window.location.reload();
    }
    if(user){
        const navHome = ()=>navigate('/');
        navHome();
    }
    console.log(user);
    return (
        <div className='login'>
            <div className='loginWrapper'>
                <div className='loginLeft'>
                    <h3 className='loginLogo'>Socials</h3>
                    <span className='loginDesc'>Connect with friends and the world around you on Socials.</span>
                </div>
                <div className='loginRight' >
                    <form className='loginBox' onSubmit={handleClick}>
                        <input type='email' placeholder='Email' required className='loginInput' ref={email} />
                        <input type='password' placeholder='Password' required minLength={6} className='loginInput' ref={password} />
                        <button type='submit' className='loginButton' >Login</button>
                        <span className='loginForgot'>Forgot Password?</span>
                        <button className='loginRegister' onClick={() => navigate('/register')}>Create a New Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login