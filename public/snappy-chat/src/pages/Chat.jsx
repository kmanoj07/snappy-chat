import {React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';

import {allUsersRoute} from '../utils/APIRoutes';

function Chat(){
    const navigate = useNavigate();
    const[contacts, setContacts] = useState([]);
    const[currentUser, setCurrentUser] = useState(undefined);

    useEffect( async () => {
        if(!localStorage.getItem('chat-app-user')) {
            navigate("/login");
            return;
        } else {
            const currentUser = await JSON.parse(localStorage.getItem('chat-app-user'));
            setCurrentUser(currentUser);
        }
    });

    useEffect(()=> {
        if(currentUser) {
            if(currentUser.isAvataarImageSet) {
                const data =  axios.get(`${allUsersRoute}/${currentUser._id}`);
                setContacts(data.data);
            } else {
                navigate('/setAvataarRoute');
            }
        }
    }, [currentUser]);
    
    return (
            <Container>
                <div className="container"></div>
            </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #131324;
    gap:1rem;

        .container {
            height: 85vh;
            width: 85vw;
            background-color: #00000076;
            display: grid;
            grid-template-columns: 25% 75%;
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                grid-template-columns: 35%% 65%;
            }
        }
`;


export default Chat;