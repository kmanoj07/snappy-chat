import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';

import Logo from '../assets/logo.svg';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import {registerRoute} from '../utils/APIRoutes'

function Register() {
    const navigate = useNavigate();
    const[username, setUserName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');

    const handleUserName = (event) => {
        setUserName(event.target.value);
    };

    const handleEmail = (event)=> {
        setEmail(event.target.value);
    };

    const handlePassword = (event)=> {
        setPassword(event.target.value);
    };

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
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
        if(password !== confirmPassword) {
            toast.error('Password and Confirm password should be same!',
             toastOptions);
             return false;
        } else if(password.length < 8) {
            toast.error('Password should be equal or greater than 8 characters',
             toastOptions);
             return false;
        } else if(username.length < 3) {
            toast.error('username should be greater than 3 characters',
             toastOptions);
             return false;
        } else if(email === "") {
            toast.error('email is required',
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
            const response  = await axios.post(registerRoute, {username, email, password});
            console.log(response);
            if(response.data.status) {
                localStorage.setItem('chat-app-user', JSON.stringify(response.data.createdUser));
            } else {
                return toast.error(response.data.msg, toastOptions);
            }
            // navigate to 
           navigate("/");
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
                        type='email'
                        placeholder='Email'
                        name='email'
                        value= {email}
                        onChange={(event)=> {handleEmail(event)}}
                    />
                       <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value= {password}
                        onChange={(event)=> {handlePassword(event)}}
                    />
                       <input
                        type='password'
                        placeholder='Confirm Password'
                        name='conformPassword'
                        value= {confirmPassword}
                        onChange={(event)=> {handleConfirmPassword(event)}}
                    />
                    <button type='submit'>Create User</button>
                    <span>Already have an account ? 
                        <Link to="/login"> Login</Link>
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

export default Register;