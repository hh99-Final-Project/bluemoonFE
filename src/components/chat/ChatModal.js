import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { chatApis } from "../../apis/chatApis";

ChatModal.propTypes = {};

function ChatModal(props) {
  const navigate = useNavigate();

  const { open, close, roomId } = props;

  const leaveRoom = (roomId) => {
    chatApis.deleteChat(roomId).then((res) => {
      window.alert("채팅방에서 나갔습니다.");
      navigate("/chatlist");
    });
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <button onClick={leaveRoom(roomId)}>채팅방 나가기</button>
          </main>
        </section>
      ) : null}
    </div>
  );
}

export default ChatModal;
