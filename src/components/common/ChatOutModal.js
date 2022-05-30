import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";

ChatOutModal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};

function ChatOutModal(props) {
    const { ChatOutTabRef, closeModal, deleteChat, charRoomId } = props;
    return (
        <React.Fragment>
            <Modal
                isOpen={true}
                // onRequestClose 속성에 넣은 함수는 오버레이 부분을 클릭하거나 또는 Esc 키를 누를 시 실행된다.
                onRequestClose={closeModal}
                // shouldCloseOnOverlayClick 값을 false 로 하면, 오버레이 클릭은 막고 Esc 키만으로 모달창을 닫게 된다.
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
                style={{
                    overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(65, 65, 65, 0.5)",
                    },
                    content: {
                        position: "absolute",
                        top: ChatOutTabRef.current.getBoundingClientRect().top,
                        left: ChatOutTabRef.current.getBoundingClientRect().left,
                        right: "auto",
                        bottom: "auto",
                        transform: "translate(-50%, -50%)",
                        width: "114px",
                        height: "30px",
                        border: "none",
                        background: "rgba(206, 215, 244, 0.84)",
                        borderradius: "4px",
                        outline: "none",
                        padding: "none",
                        overflow: "hidden",
                    },
                }}
            >
                <ModalContainer onClick={() => deleteChat(charRoomId)}>채팅방 나가기</ModalContainer>
            </Modal>
        </React.Fragment>
    );
}

export default ChatOutModal;

const ModalContainer = styled.div`
    width: 114px;
    height: 30px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;
