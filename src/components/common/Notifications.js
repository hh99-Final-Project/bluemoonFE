import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Notice from "./Notice";
import Modal from "react-modal";

Notifications.propTypes = {

};

function Notifications(props) {

    const { closeModal } = props;

    let alertList = [
        {
            title: "곽혜미",
            desc: "라라라",
            createdAt: "2022-04-21 11:23",
            id: 1,
        },

        {
            title: "김김김",
            desc: "김김22",
            createdAt: "2022-01-21 11:23",
            id: 2,
        },
        {
            title: "원숭이",
            desc: "재주부리다 넘어짐",
            createdAt: "2022-03-21 11:23",
            id: 3,
        },
    ];


    return (
        <div>
            <Modal
                isOpen={true}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={false}
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
                        zIndex: 2,
                        top: '500px',
                        left: 'calc(50% + 200px)',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        height: '900px',
                        border: 'none',
                        background: '#ffffff',
                        borderRadius: '10px',
                        outline: 'none',
                        padding: '20px'
                    }
                }}>
                <NotiHeader>
                    <Title>알림창</Title>
                    <CloseButton onClick={closeModal}>X</CloseButton>
                </NotiHeader>
            {
                alertList.map((alert) => {
                    return <Notice key={alert.id} alert={alert}/>
                })
            }
            </Modal>
        {/*</AlertContainer>*/}
        </div>
    );
}

export default Notifications;

const NotiHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0 20px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const CloseButton = styled.div`
  font-weight: bold;
  font-size: 30px;
  cursor: pointer;
`;