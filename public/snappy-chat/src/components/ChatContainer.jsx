import React from "react";
import { styled } from "styled-components";
import Logout from "./Logout";

function ChatContainer({ currentChat }) {
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avataar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avataarImage}`}
                  alt="avataar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout/>
          </div>
          <div className="chat-messages"></div>
          <div className="chat-input"></div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
    padding-top: 1rem;
    .chat-header {
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding: 0rem 2rem;
        .user-details {
            display:flex;
            align-items:center;
            gap: 1rem;
            .avataar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }

    }
`;

export default ChatContainer;
