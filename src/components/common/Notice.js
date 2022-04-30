import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChatOutModal from "./ChatOutModal"

Notice.propTypes = {
    alert: PropTypes.object.isRequired
};

function Notice(props) {

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

                {modalOpen && <ChatOutModal modalOpen={modalOpen} closeModal={closeModal}/>}
            </AlertSliceContainer>
        </React.Fragment>
    );
}

export default Notice;


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

