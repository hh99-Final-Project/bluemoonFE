import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ChatOutModal from "./ChatOutModal";
import { Navigate } from "react-router-dom";

Notice.propTypes = {
    alert: PropTypes.object.isRequired,
};

function Notice(props) {
    const { alert } = props;

    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <React.Fragment>
            <AlertSliceContainer
                onClick={() => {
                    setCurrentHeader("마이페이지");
                    Navigate(`/diary/${alert.postUuid}`);
                }}
            >
                <TitleArea>
                    <CreatedAt>{alert.createdAt}</CreatedAt>
                </TitleArea>
                <ContentArea>
                    <Desc>{alert.message}</Desc>
                </ContentArea>
            </AlertSliceContainer>
        </React.Fragment>
    );
}

export default Notice;

const AlertSliceContainer = styled.div`
    //width: 213px;
    height: 59px;
    box-sizing: border-box;
    background-color: #d0d5e3;
    margin-bottom: 8px;
    border-radius: 5px;
    padding: 7px;
    cursor: pointer;
`;
const TitleArea = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 6px;
    font-size: 10px;
    line-height: 12px;
`;
const Title = styled.div``;
const CreatedAt = styled.div`
    font-size: 10px;
    line-height: 12px;
`;
const ContentArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Desc = styled.div`
    font-size: 12px;
    line-height: 15px;
`;

const MoreIcon = styled.div``;
