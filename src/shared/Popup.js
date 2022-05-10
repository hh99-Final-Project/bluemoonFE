import React from 'react';
import PropTypes from 'prop-types';
import Modal from "react-modal";
import styled from "styled-components";

Popup.propTypes = {

};

function Popup(props) {

    const {title, desc, event, close} = props;

    //props.title, props.desc, props.event, props.close

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
                        backgroundColor: 'rgba(33, 33, 33, 0.5)',
                        zIndex: 30
                    },
                    content: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        width: '359px',
                        height: '203x',
                        boxSizing: 'border-box',
                        border: 'none',
                        background: 'rgba(230, 236, 241, 0.8)',
                        borderRadius: '20px',
                        outline: 'none',
                        padding: '26px 6px',
                        zIndex: 30
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
    margin: 44px auto 39px;
    text-align: center;
    font-size: 18px;
    line-height: 22px;
    
`;
const Desc = styled.div`
    text-align: center;
    font-size: 18px;
    margin-bottom: 50px;
`;
const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
`
const Confirm = styled.div`
    font-weight: bold;
    cursor:pointer;
    width: 157px;
    height: 46px;
    background-color:#8D91A7;
    border-radius: 10px;
  
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Back = styled(Confirm)`
    cursor: pointer;
`;