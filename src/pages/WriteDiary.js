import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CategoryBar from "../shared/CategoryBar";
import Header from "../shared/Header";
import useRecordVoice from "../hooks/useRecordVoice";

import Popup from "../shared/Popup";
import { diaryApi } from "../apis/diaryApi";
import useStore from "../zustand/store";
import {useSelector} from "react-redux";
import backIcon from "../static/images/backIcon.svg";
import VoicePopup from "../components/diary/VoicePopup";

WriteDiary.propTypes = {};

function WriteDiary(props) {
  const navigate = useNavigate();
  const { setCurrentHeader } = useStore();
  const {
    recordVoice,
    stopRecord,
    pause,
    replay,
    play,
    audioUrl,
    deleteVoice
  } = useRecordVoice();

  const [title, setTitle] = useState("");
  const [diary, setDiary] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenVoicePoup, setIsOpenVoicePopup] = useState(false);

  const userInfo = useSelector((state) => state.userSlice.userInfo)

  const onChangeTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContentHandler = (e) => {
    //일단 최대 길이를 800자로만 설정했습니다. 기획에 따라 변동합니다.
    if (diary.length > 800) {
      return;
    }
    setDiary(e.target.value);
  };

  const onClickHandler = (e) => {

    if(!userInfo){
      window.alert('로그인하셔야 등록 가능합니다!')
      return;
    }

    // api 연동 (voice 보내기 or 다이어리 내역 보내기)
    diaryApi.createPost(title, diary, audioUrl).then((response) => {
      console.log(response);
      if(response.status === 200) {
        window.alert('작성 완료입니다!');
        navigate('/mypage')
      } else {
        window.alert("고민 작성에 실패했어요! 다시 시도해주세요")
      }
    });
  };


  useEffect(()=>{
    setCurrentHeader('포스트')
  }, [])

  return (
    <WriteContainer>
      {/*<button onClick={() => navigate('/diary/1')}>다이어리 페이지 이동</button>*/}
      <Header/>
      <CategoryBar/>
      <PostAreaContainer>
        <PostHeader>
          <img src={backIcon}/>
        </PostHeader>
        <WriteArea>
          <PostText
            placeholder="제목을 작성해주세요"
            onChange={onChangeTitleHandler}
          />
          <PostArea
            placeholder="1000자 내로 작성해주세요"
            onChange={onChangeContentHandler}
          />
        </WriteArea>

        <VoiceLeft>
          <VoicePlayButton onClick={play}>재생</VoicePlayButton>
          <VoiceRecordButton onClick={recordVoice}>녹음</VoiceRecordButton>
          <VoiceStop onClick={stopRecord}>중지</VoiceStop>
          <VoiceTempStop onClick={pause}>일시정지</VoiceTempStop>
          <VoiceTempReplay onClick={replay}>다시시작</VoiceTempReplay>
          <DeleteVoice onClick={deleteVoice}>삭제</DeleteVoice>
          <OpenPopup onClick={() => setIsOpenVoicePopup(true)}>열기</OpenPopup>
        </VoiceLeft>
        <PostLength>{diary.length}/1000</PostLength>

        <PostButton onClick={onClickHandler}>등록하기</PostButton>

      </PostAreaContainer>

      {isOpenPopup && (
        <Popup
          title={"작성중이신데 나가실건가요?"}
          desc={"레알 진짜?"}
          close={() => setIsOpenPopup(false)}
          event={() => navigate("/diarylist")}
        />
      )}
      {
        isOpenVoicePoup && <VoicePopup/>
      }
    </WriteContainer>
  );
}

export default WriteDiary;

const WriteContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #081134;
  position: relative;
`;


const PostAreaContainer = styled.div`
  margin: auto;
  width: 950px;
  height: 530px;
  background: linear-gradient(180deg, rgba(63, 75, 112, 0.79) 0%, rgba(100, 114, 152, 0.79) 100%);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  box-shadow: 0 0 70px #465981;
  backdrop-filter: blur(80px);
  border-radius: 25px;
  position: relative;
`;


const PostHeader = styled.div`
  width: 100%;
  height: 52px;
  background-color: #2F3A5F;
  margin: 23px auto 0;
  
  img {
    margin: 10px 23px 0 40px;
  }
`;

const WriteArea = styled.div`
  margin-bottom: 10px;
  padding: 0 34px 0 40px;
`;

const PostText = styled.input`
  width: 876px;
  height: 47px;
  background-color: #959EBE;
  outline: none;
  border: none;
  padding: 14px 34px;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 10px 0;
  font-size: 20px;
  line-height: 24px;
  ::placeholder {
    font-size: 20px;
    line-height: 24px;
    color: rgba(8, 16, 93, 0.5);
  }
`;

const PostArea = styled.textarea`
  width: 876px;
  height: 352px;
  box-sizing: border-box;
  padding: 20px;
  background-color: #959EBE;
  border: none;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
  resize: none;
  outline: none;
  border-radius: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  
  ::placeholder {
    font-size: 20px;
    line-height: 24px;
    color: rgba(8, 16, 93, 0.5);
  }
`;


const VoiceLeft = styled.div`
  display: flex;
  position: absolute;
  bottom: 50px;
  left: 60px;
`;

const PostLength = styled.div`
  position: absolute;
  bottom: 50px;
  right: 60px;
  font-size: 14px;
  line-height: 17px;
  color: #08105D;
`;


const VoicePlayButton = styled.div`
  width: 70px;
  height: 50px;
  background-color: #828282;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const VoiceRecordButton = styled(VoicePlayButton)``;

const VoiceStop = styled(VoicePlayButton)``;
const VoiceTempStop = styled(VoicePlayButton)``;
const VoiceTempReplay = styled(VoicePlayButton)``;
const OpenPopup = styled(VoicePlayButton)``;
const DeleteVoice = styled(VoicePlayButton)``;


const PostButton = styled.a`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100px;
  height: 60px;
  margin: 50px auto 100px;
  font-size: 20px;
  font-weight: bold;
  background-color: #c4c4c4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  cursor: pointer;
`;
