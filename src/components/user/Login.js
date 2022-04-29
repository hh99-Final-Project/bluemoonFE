import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from 'react-modal';
import KakaoLogin from "react-kakao-login";
import { isModalOpen } from "../../redux/modules/commonSlice";

Login.propTypes = {

};

function Login(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modalIsOpen = useSelector((state) => state.commonSlice.modalIsOpen);

    // const onSuccess = (res) => {
    // console.log("res:",res);

    //kakao res
    //res.access_token
    //res.id_token

    //google res
    // res.accessToken
    // res.tokenId
    // }

    const kakaoLoginHandler =  () => {


    }

    // const logoutHandler = () => {
    //     //리덕스 user 값 삭제
    // }

    // const onFail = (err) => {
    //     console.log("로그인이 실패했습니다", err);
    // }

    const closeModal = () => {
        dispatch(isModalOpen(false))
    }


    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
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
                        width: '595px',
                        height: '548px',
                        border: 'none',
                        background: '#ffffff',
                        borderRadius: '20px',
                        outline: 'none',
                        padding: '20px'
                    }
                }}>
                <CloseButton onClick={closeModal}>X</CloseButton>
                <LoginText>
                    로그인
                </LoginText>
                <LoginButtons>
                    {/* <KakaoLogin
              token={String(process.env.NEXT_PUBLIC_KAKAO_APPKEY)}
              onSuccess={onSuccess}
              onFail={onFail}
              onLogout={logoutHandler}
              render={({ onClick }) => {
                  return (
                    <KaKaoLoginText
                      onClick={(e) => {
                        e.preventDefault();
                        onClick();
                      }}
                    >
                      카카오로 로그인하기
                    </KaKaoLoginText>
                  );
                }}
          />                 */}

                    {/* <GoogleLogin
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENTID}
              onSuccess={onSuccess}
              onFailure={onFail}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                  <GoogleLoginText onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      구글로 로그인하기
                  </GoogleLoginText>
              )}
          /> */}
                </LoginButtons>
            </Modal>
        </div>
    );
}

export default Login;


const CloseButton = styled.div`
  text-align: right;
  font-size: 40px;
  cursor: pointer;
`;

const LoginText = styled.div`
  margin: 80px auto 180px;
  font-size: 45px;
  font-weight: bold;
  text-align: center;
`;

const LoginButtons = styled.div`
  margin: auto;
  width: 400px;
`;


const KaKaoLoginText = styled.div`
  background-color: #FFD464;
  height: 60px;
  font-size: 22px;
  line-height: 39px;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;

`;

const GoogleLoginText = styled(KaKaoLoginText)`
  background-color: #176BEF;
  margin-top: 25px;
`;