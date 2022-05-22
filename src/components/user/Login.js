import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
import KakaoLogin from "react-kakao-login";
import GoogleLogin from "react-google-login";
import { isModalOpen } from "../../redux/modules/commonSlice";
import { userApi } from "../../apis/userApi";
import { setCookie } from "../../utils/cookie";
import { isLogined, getUserInfo } from "../../redux/modules/userSlice";
import { mobAlertCloseBtn } from "../../static/images/resources";


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const modalIsOpen = useSelector((state) => state.commonSlice.modalIsOpen);


    const kakaoLoginHandler = (res) => {
        userApi.kakaoLogin(res.response.access_token).then((response) => {
            if (response.status === 200) {
                //헤더에 담긴 토큰 확인 필요
                let token = response.headers.authorization;
                setCookie(token);
                dispatch(getUserInfo(response.data));
                dispatch(isLogined(true));
                dispatch(isModalOpen(false));

                if (response.data.nickname === "") {
                    navigate("/signup");
                } else {
                    //현재 있었던 페이지로 돌아간다.
                    if(pathname === "/") {
                        navigate("/diarylist");
                    } else {
                        navigate(pathname);
                    }

                }
            } else {
                console.log("err");
            }
        });
    };

    const googleLoginHandler = (res) => {
        userApi.googleLogin(res.tokenId).then((response) => {
            if (response.status === 200) {
                console.log(response);
                let token = response.headers.authorization;
                setCookie(token);
                dispatch(getUserInfo(response.data));
                dispatch(isLogined(true));
                dispatch(isModalOpen(false));
                if (response.data.nickname === "") {
                    navigate("/signup");
                } else {
                    //현재 있었던 페이지로 돌아가요!
                    if(pathname === "/") {
                        navigate("/diarylist");
                    } else {
                        navigate(pathname);
                    }
                }
            } else {
                console.log("err");
            }
        });
    };

    const logoutHandler = () => {
        //리덕스 user 값 삭제
    };

    const onFail = (err) => {
        console.log("로그인이 실패했습니다", err);
    };

    const closeModal = () => {
        dispatch(isModalOpen(false));
    };

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={{
                    overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(35, 35, 35, 0.46)",
                        zIndex: 20
                    },
                    content: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        transform: "translate(-50%, -50%)",
                        width: "365px",
                        height: "264px",
                        border: "none",
                        backgroundColor: "rgba(198, 211, 236, 0.9)",
                        borderRadius: "10px",
                        outline: "none",
                        overflow: "hidden",
                        zIndex: 100,
                        boxSizing: "border-box"
                    },
                }}
            >
                <CloseButton onClick={closeModal} src={mobAlertCloseBtn}/>
                <LoginText>
                    다이어리를 가진 사람만<br/>
                    사용할 수 있어요!를
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
                                    카카오로 시작하기
                                </KaKaoLoginText>
                            );
                        }}
                    />
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
                        onSuccess={googleLoginHandler}
                        onFailure={onFail}
                        cookiePolicy={"single_host_origin"}
                        render={(renderProps) => (
                            <GoogleLoginText onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                Google로 시작하기
                            </GoogleLoginText>
                        )}
                    />
                </LoginButtons>
            </Modal>
        </div>
    );
}

export default Login;

const CloseButton = styled.img`
  position: absolute;
  right: 20px;
  cursor:pointer;
  width: 12.8px;
  height: 12.8px;
`;

const LoginText = styled.div`
    font-size: 18px;
    line-height: 23px;
    text-align: center;
    margin-top: 38px;
    color: #08105D;
`;

const LoginButtons = styled.div`
    margin: 24px auto 0;
    width: 244px;
`;

const KaKaoLoginText = styled.div`
    width: 100%;  
    height: 35px;
    background-color: #FAE301;
    border: 1px solid #BBB0B0;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    color: #673904;
    font-size: 12px;
    line-height: 15px;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
`;

const GoogleLoginText = styled(KaKaoLoginText)`
      background: #FFFFFF;
      border: 1px solid #DEDEDE;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
      margin-top: 14px;
      color: #2D53A9;
`;
