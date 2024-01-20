import React from 'react';
import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer";
import Cookies from 'js-cookie';

const currentUser = Cookies.get('user');

const INITIAL_STATE = {
    user: currentUser ? JSON.parse(currentUser) : null,
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE)


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    )
}


/*

{
    _id: "650c5e73186e3f01b5b75564",
    username: 'partha',
    email: 'partha@gmail.com',
    password: '$2b$10$1aV922sQ1FAPYXf5bM5BwOyi3PGDd3jB1J/IEroPdVtAEBkroXARG',
    profilePicture: 'person/3.jpeg',        
    coverPicture: '',
    followers: [ '64fefac3e9058b3709216fcb' 
  ],
    followings: [ '64fefac3e9058b3709216fcb' ],
    isAdmin: false,
    desc: '',
    from: '',
    relationship: 1,
    createdAt: "2023-09-21T15:17:07.499Z",    
    updatedAt: "2023-09-27T15:32:29.039Z",    
    __v: 0
  }

*/