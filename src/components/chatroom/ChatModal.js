import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";



const ChatModal = (props) => {

    const navigate = useNavigate();

    const { open, close, roomId } = props;

    const leaveRoom = (roomId) => {
        // api
        //     .delete(`api/rooms/{roomId}`, {
        //         header: { Authorization: `//쿠키에서 토큰 받아오기` },
        //     })
        //     .then((res) => {
        //         window.alert("채팅방에서 나갔습니다.");
        //         navigate("/chatlist");
        //     });
    };

    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        {/*{header}*/}
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>
                        <button onClick={leaveRoom}>채팅방 나가기</button>
                        <button>차단하기?</button>
                    </main>
                </section>
            ) : null}
        </div>
    );
}
export default ChatModal;