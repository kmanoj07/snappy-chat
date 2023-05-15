import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvataarRoute } from "../utils/APIRoutes";
var Buffer = require('buffer/').Buffer 

export default function SetAvataar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avataars, setAvataars] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [selectedAvataar, setSelectedAvataar] = useState(undefined);

  const toastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
     if(selectedAvataar === undefined) {
        toast.error("Please select an avatar", toastOptions);
      } else {
          const {user} = await JSON.parse(localStorage.getItem('chat-app-user'));
          const id = user._id;
          const {data} = await axios.post(`${setAvataarRoute}/${id}`, {
              image: avataars[selectedAvataar]
          });
          // console.log(data);
          if(data.isSet && data.status){
            user.isAvataarImageSet = true;
            user.avataarImage = data.image;
            localStorage.setItem('chat-app-user', JSON.stringify(user));
            navigate("/");
          } else {
            toast.error('Error in creating profile image, plesae try again', toastOptions);
          }
        }      
  };

  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
          navigate('/login');
          return;
    }
    const fetchData = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=20ApqWyzSbjORK`);
          const buffer = Buffer.from(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvataars(data);
        setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
    { 
      isloading ? <Container>
          <img src = {loader} alt ="loader" className="loader"/>
      </Container> : (
        <>
           <Container>
        <div className="title-container">
          <h1>Pick an avataar as your profile picture</h1>
        </div>
        <div className="avataars">
            {avataars.map((avataar, index) => (
              <div
                key={index}
                className={`avataar ${
                  selectedAvataar === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avataar}`}
                  alt="avataar"
                  onClick={() => setSelectedAvataar(index)}
                />
              </div>
            ))}
          </div>
          <button className="submit-btn" 
            onClick={setProfilePicture}>set as profile picture</button>
      </Container>
      <ToastContainer />
        </>
      )
    }
    </>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    gap:3rem;
    background-color:#131324;
    height:100vh;
    width:100vw;
    .loader {
        max-inline-size: 100%;
    }
    .title-container {
        h1 {
            color: white;
        }
    }
    .avataars {
        display: flex;
        gap:2rem;
        .avataar {
            border:0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height:  6rem;
              }
          }
          .selected {
              border: 0.4rem solid #4e0eff;
          }
      }
      .submit-btn {
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
`;
