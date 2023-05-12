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
  const setProfilePicture = async () => {};
  useEffect(() => {
    const fetchData = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=20ApqWyzSbjORK`);
          // defining a buffer for image
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
      </Container>
      <ToastContainer />
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
            img {
                height:  6rem;
                cursor: pointer;
            }

        }
    }
`;
