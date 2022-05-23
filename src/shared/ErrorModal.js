import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showError } from "../redux/modules/errorSlice";


const ErrorModal = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.errorSlice.error);
    const closeModal = () => {
        dispatch(showError({isOpen: false, message: ""}));
    };

    return (
        <ErrorContainer>
            <Modal
                isOpen={error.isOpen}
                onRequestClose={closeModal}
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
                        zIndex: 9999999
                    },
                    content: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        transform: "translate(-50%, -50%)",
                        width: "365px",
                        height: "250px",
                        border: "none",
                        boxSizing: "border-box",
                        background: "rgb(204, 215, 238)",
                        borderRadius: "10px",
                        outline: "none",
                        padding: "20px",
                        overflow: "hidden",
                        zIndex: 9999999
                    },
                }}>
                <Title>
                    {error.message ? error.message : "잠시 후 다시 요청해주세요!"}
                </Title>
                <ButtonArea>
                    <Refresh onClick={() => {
                        closeModal();
                        window.location.reload();
                    }}>
                        새로고침
                    </Refresh>
                    <BackToPage onClick={() => {
                        closeModal();
                        navigate(-1);
                    }}>
                        취소
                    </BackToPage>
                </ButtonArea>

            </Modal>
        </ErrorContainer>
    );
};

export default ErrorModal;

const ErrorContainer = styled.div`
  box-sizing: border-box;
`;
const Title = styled.div`
  margin-top: 49px;
  line-height: 23px;
  text-align: center;
  color: #08105D;
`;
const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
`;
const Refresh = styled.div`
  font-weight: bold;
  cursor: pointer;
  width: 150px;
  height: 47px;
  background-color: #354569;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 17px;
  line-height: 21px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const BackToPage = styled(Refresh)`
  cursor: pointer;
  border: 1px solid #354569;
  background-color: transparent;
  color: #354569;

`;

