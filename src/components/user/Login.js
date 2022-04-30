import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from 'react-modal';
import KakaoLogin from "react-kakao-login";
import { isModalOpen } from "../../redux/modules/commonSlice";
import { userApi } from "../../apis/userApi";
import { setCookie } from "../../utils/cookie";
import { isLogined, getUserInfo } from "../../redux/modules/userSlice";


Login.propTypes = {

};

const gapi = window.gapi;

function Login(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modalIsOpen = useSelector((state) => state.commonSlice.modalIsOpen);
    const isLogin = useSelector((state) => state.userSlice.isLogin);

    //google res
    // res.accessToken
    // res.tokenId

    const kakaoLoginHandler =  (res) => {
        userApi.kakaoLogin(res.response.access_token).then((response) =>{
            if(response.status === 200) {
                //헤더에 담긴 토큰 확인 필요
                let token = response.headers.authorization;
                setCookie(token);
                dispatch(getUserInfo(response.data))
                dispatch(isLogined(true));
                navigate('/select');
            } else {
                console.log("err")
            }
        })
    }

    function updateSigninStatus(isSignedIn) {
        console.log({ isSignedIn });
        if (isSignedIn) {
            console.log("yes")
            // makeApiCall();
        }
    }


    const init = () => {
        gapi.client.init({
            'apiKey': process.env.REACT_APP_GOOGLE_APIKEY,
            'clientId': process.env.REACT_APP_GOOGLE_CLIENTID,
            'scope': 'profile',
        }).then(function() {
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        }).then(function(response) {
            console.log(response.result);
        }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    }

    const googleLoginHandler = () => {

    }

    const logoutHandler = () => {
        //리덕스 user 값 삭제
    }

    const onFail = (err) => {
        console.log("로그인이 실패했습니다", err);
    }

    const closeModal = () => {
        dispatch(isModalOpen(false))
    }

    useEffect(()=>{
        window.gapi.load('client:auth2', init);
    },[])


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
                    <KakaoLogin
                      token={String(process.env.REACT_APP_KAKAO_APPKEY)}
                      onSuccess={kakaoLoginHandler}
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
                    />
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
                    <GoogleLoginText onClick={googleLoginHandler}>
                        구글로 로그인하기
                    </GoogleLoginText>
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