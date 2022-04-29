import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from "react-modal";

AlertPopup.propTypes = {

};

function AlertPopup(props) {

    const { alert } = props;

    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    }


    return (
        <React.Fragment>
            <AlertSliceContainer>
                <TitleArea>
                    <Title>
                        {alert.title}
                    </Title>
                    <CreatedAt>
                        {alert.createdAt}
                    </CreatedAt>
                </TitleArea>

                <ContentArea>
                    <Desc>{alert.desc}</Desc>
                    <MoreIcon onClick={()=>setModalOpen(true)}>더보기</MoreIcon>
                </ContentArea>

                {modalOpen && <SettingModal modalOpen={modalOpen} closeModal={closeModal}/>}
            </AlertSliceContainer>
        </React.Fragment>
    );
}

export default AlertPopup;


const SettingModal = ({modalOpen, closeModal}) => {
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
                    <li>차단하기</li>
                </ModalContainer>
            </Modal>

        </React.Fragment>
    )
}


const AlertSliceContainer = styled.div`
    width: 100%;
    height: 132px;
    box-sizing: border-box;
    background-color: #9E9E9E;
    margin-bottom: 20px;
    border-radius: 4px;
    padding: 20px;
    cursor: pointer;
`;
const TitleArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;
const Title = styled.div`
    font-weight: bold;
    font-size: 20px;
`;
const CreatedAt = styled.div``;
const ContentArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Desc = styled.div``;

const MoreIcon = styled.div``;

const ModalContainer = styled.ul`
    list-style:none;
    li {
        font-size: 20px;
        margin-bottom: 10px;
        cursor: pointer;
    }
`;