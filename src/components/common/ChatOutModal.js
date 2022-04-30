import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";

ChatOutModal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

function ChatOutModal(props) {
    const {modalOpen, closeModal} = props;
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(65, 65, 65, 0.5)'
                    },
                    content: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        width: '230px',
                        height: '93px',
                        border: 'none',
                        background: '#ffffff',
                        borderRadius: '20px',
                        outline: 'none',
                        padding: '20px'
                    }
                }}>
                <ModalContainer>
                    <li>채팅방 나가기</li>
                </ModalContainer>
            </Modal>
        </React.Fragment>
    )

}

export default ChatOutModal;

const ModalContainer = styled.ul`
    list-style:none;
    li {
        font-size: 20px;
        margin-bottom: 10px;
        cursor: pointer;
    }
`;