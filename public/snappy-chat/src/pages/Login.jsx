import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Link, json, useNavigate} from 'react-router-dom';

import Logo from '../assets/logo.svg';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import {loginRoute} from '../utils/APIRoutes'

function Login() {
    const navigate = useNavigate();

    const[username, setUserName] = useState('');
    const[password, setPassword] = useState('');

    const handleUserName = (event) => {
        setUserName(event.target.value);
    };

    const handlePassword = (event)=> {
        setPassword(event.target.value);
    };

    const toastOptions  = {
        position : "bottom-center",
        autoClose: 5000,
        pauseOnHover: true,
        draggable:true,
        theme:"dark",
    };

    useEffect(()=> {
        if(localStorage.getItem('chat-app-user')) {
            navigate("/");
        }
    }, []);

    const handleValidation = () => {
        if(password == "" || username == "") {
            toast.error('Password and username is required!',
                toastOptions);
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isvalidated = handleValidation();
        if(isvalidated) {
            // call the ergister route from APIRoutes
            const response  = await axios.post(loginRoute, {username, password});
            if(response.data.status) {
                // create the local storage to store the logged in information
                localStorage.setItem('chat-app-user', JSON.stringify(response.data));
            } else {
                toast.error(response.data.msg, toastOptions);
                return false;
            }
            // navigate to chat logged in 
            navigate("/setAvataar");
        }
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="logo"/>
                        <h1>Snappy</h1>
                    </div>
                    <input 
                        type="text" 
                        placeholder='uername' 
                        name='username' 
                        value={username} 
                        onChange={(event) => {handleUserName(event)}} 
                    />
                       <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value= {password}
                        onChange={(event)=> {handlePassword(event)}}
                    />
                    <button type='submit'>Login</button>
                    <span>Don't have an account ? 
                        <Link to="/register"> Register here</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>        
    );
}

const FormContainer = styled.div `
    height: 100vh;
    width:100vw;
    display:flex;
    flex-direction: column;
    justify-content:center;
    gap:1rem;
    align-items:center;
    background-color:#131324;
    .brand {
        display:flex;
        align-items:center;
        gap:1rem;
        justify-content: center;

        img {
            height:5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }

    form {
        display:flex;
        flex-direction: column;
        gap:2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding:3rem 5rem;

        input {
            background-color: transparent;
            padding:1rem;
            border:0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width : 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;  
            }
        }

        button {
                background-color: #997af0;
                color: white;
                padding: 1rem 2rem;
                cursor: pointer;
                font-weight: bold;
                border-radius: 0.4rem;
                font-size: 1rem;
                text-transform: uppercase;
                &:hover{
                    background-color: #4e0eff;
                }
            }
            span {
                color: white;
                text-transform: uppercase;
                a {
                    color: #4e0eff;
                    text-decoration : none;
                    font-weight: bold;
                }
            }
    }
`;

export default Login;