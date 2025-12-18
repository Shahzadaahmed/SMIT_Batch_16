// Log In...!

"use client";

import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logInUser } from '@/redux/actions/auth-actions/auth-actions';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setCookie } from "cookies-next";
import { LOGIN_USER } from "@/redux/reducers/auth-reducer/auth-reducer";

const provider = new GoogleAuthProvider()

const LogIn = () => {
    const [formStates, setFormStates] = useState({
        email: "",
        password: "",
        loading: false
    });

    const dispatch = useDispatch<AppDispatch>();

    const clearAllStates = () => {
        setFormStates({
            email: "",
            password: "",
            loading: false
        });
    }

    // Log In Handler...!
    const logInHandler = async () => {
        const user = {
            email: formStates.email,
            password: formStates.password
        };
        console.log('User: ', user);

        dispatch(logInUser(user)).finally(() => {
            clearAllStates();
        });
    }

    // Google sign in handler...!
    const googleSignInHandler = async () => {
        try {
            const gooleRes = await signInWithPopup(auth, provider);
            const userDetails = gooleRes?.user;
            console.log('Google user: ', userDetails);

            const saveUser = {
                email: userDetails?.email,
                uid: userDetails?.uid,
                name: userDetails?.displayName,
                dp: userDetails?.photoURL
            };

            const googleToken = await userDetails?.getIdToken();
            console.log('Google token: ' , googleToken);
            if (googleToken) {
                // Saving token...!
                setCookie('token', googleToken);

                // Saving auth user in redux...!
                dispatch(LOGIN_USER(saveUser));

                window.location.reload();
            }
        }

        catch (error) {
            console.log('Something went wrong while sign un with google: ', error);
        };
    };

    return (
        <div>
            <h1> Log In </h1>

            <label htmlFor="email">
                Email :
                <input
                    type="email"
                    placeholder='Enter Your Email'
                    value={formStates.email}
                    onChange={(e) => { setFormStates({ ...formStates, email: e.target.value }) }}
                    id='email'
                />
            </label>
            <br />
            <label htmlFor="password">
                Password :
                <input
                    type="password"
                    placeholder='*****'
                    value={formStates.password}
                    onChange={(e) => { setFormStates({ ...formStates, password: e.target.value }) }}
                    id='password'
                />
            </label>
            <br />
            <button onClick={logInHandler}> Log In </button>

            <hr />
            <button onClick={googleSignInHandler}> Sign in with Google </button>
        </div>
    );
};

export default LogIn;