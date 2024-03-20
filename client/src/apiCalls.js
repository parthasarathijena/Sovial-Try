import Cookies from 'js-cookie';


export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await fetch('https://social-try.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCredential)
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
            Cookies.set('user', JSON.stringify(data), { expires: 30 });
            // console.log(Cookies.get('user'));
            dispatch({ type: "LOGIN_SUCCESS", payload: data });
        }
        else
            dispatch({ type: "LOGIN_FAILURE", payload: {} });
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    };
};
