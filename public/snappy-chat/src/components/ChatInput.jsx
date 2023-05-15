import React, {useState} from "react";
import { styled } from "styled-components";
import EmojiPicker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';
import { ToastContainer, toast } from "react-toastify";

function ChatInput({handleSendMessage}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [message, setMessage] = useState("");

    const toastOptions = {
        position: "bottom-center",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    
    const handleEmojiPickerHideShow = ()=> {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (emojiData, event)=> {
        let msg  =  message;
        console.log(emojiData);
        msg += emojiData.emoji;
        setMessage(msg);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if(message.length > 0){
            handleSendMessage(message);
            setMessage('');
        } else {
            toast.warning('Please type your message!',toastOptions)
        }
    }

    return (
        
        <Container>
            <div className="button-container">
                <div className="emoji" >
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                    {
                        showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick}/>
                    }
                </div>
            </div>
            <form className="input-container" onSubmit={(e) => {sendChat(e)}}>
                <input 
                        type="text" 
                        placeholder="type your message here" 
                        value={message} 
                        onChange={(e) => {setMessage(e.target.value)}} />
                
                <button className="submit">
                    <IoMdSend/>
                </button>
            </form>
            <ToastContainer/>
        </Container>
       
    )
}

const Container   = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #080420;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    
    .button-container {
        display: flex;
        align-items:center;
        color: white;
        gap:1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact {
                position: absolute;
                top:-460px;
                height: 200px;
                width: 300px;
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display:flex;
        align-items: center;
        gap:2rem;
        background-color: #ffffff34;
        input {
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection{
                background-color: #9186f3;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            cursor: pointer;
            svg {
                    font-size: 2rem;
                    color: white;
            }
        }
    }

`;

export default ChatInput;