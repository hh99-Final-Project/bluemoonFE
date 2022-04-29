import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-modal";
import styled from "styled-components";

Popup.propTypes = {

};

function Popup(props) {

    const {title, desc, event, close} = props;

    const confirmHandler = () => {
        event();
    }


    return (
        <React.Fragment>
            <Modal
                isOpen={true}
                onRequestClose={close}
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
                        width: '300px',
                        height: '200px',
                        border: 'none',
                        background: '#ffffff',
                        borderRadius: '20px',
                        outline: 'none',
                        padding: '20px'
                    }
                }}>
                <Title>{title}</Title>
                <Desc>{desc}</Desc>
                <ButtonArea>
                    <Confirm onClick={confirmHandler}>네</Confirm>
                    <Back onClick={close}>아니오</Back>
                </ButtonArea>
            </Modal>
        </React.Fragment>
    );
}

export default Popup;


const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin: 30px 0;
    text-align: center;
`;
const Desc = styled.div`
    text-align: center;
    font-size: 18px;
    margin-bottom: 50px;
`;
const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Confirm = styled.div`
    margin-right: 30px;
    font-weight: bold;
    cursor:pointer;
`;
const Back = styled.div`
    cursor:pointer;
`;