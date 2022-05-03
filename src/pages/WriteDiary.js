import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CategoryBar from "../shared/CategoryBar";
import Header2 from "../shared/Header2";
import useRecordVoice from "../hooks/useRecordVoice";

import Popup from "../shared/Popup";
import { diaryApi } from "../apis/diaryApi";
import useStore from "../zustand/store";
import {useSelector} from "react-redux";

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
    audioUrl
  } = useRecordVoice();

  const [title, setTitle] = useState("");
  const [diary, setDiary] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);

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
    <React.Fragment>
      {/*<button onClick={() => navigate('/diary/1')}>다이어리 페이지 이동</button>*/}
      <Header2/>
      <PostTitle>고민 털어놓기</PostTitle>
      <CategoryBar/>
      <PostAreaContainer>
        <PostText
          placeholder="제목을 작성해주세요"
          onChange={onChangeTitleHandler}
        />
        <PostArea
          placeholder="1000자 내로 작성해주세요"
          onChange={onChangeContentHandler}
        />
        <PostLength>{diary.length}/1000</PostLength>

        <VoiceContainer>
          <VoicePlayButton onClick={play}>재생</VoicePlayButton>
          <VoiceRecordButton onClick={recordVoice}>녹음</VoiceRecordButton>
          <VoiceStop onClick={stopRecord}>중지</VoiceStop>
          <VoiceTempStop onClick={pause}>일시정지</VoiceTempStop>
          <VoiceTempReplay onClick={replay}>다시시작</VoiceTempReplay>
          <button onClick={testPlay}>소리들리나</button>
        </VoiceContainer>
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
    </React.Fragment>
  );
}

export default WriteDiary;

const PostTitle = styled.div`
  font-weight: bold;
  font-size: 32px;
  text-align: center;
  margin: 200px auto 100px;
`;

const PostAreaContainer = styled.div`
  margin: 0 auto 50px;
  width: 1000px;
  height: 804px;
  position: absolute;
  z-index: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #e0e0e0;
`;

const PostText = styled.input`
  position: absolute;
  z-index: 1;
  width: 900px;
  height: 67px;
  top: 42px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(205, 205, 205, 0.9);
  outline: none;
  border: none;
  padding: 14px 34px;
  font-size: 32px;
  border-radius: 20px;
  ::placeholder {
    color: #a59f9f;
    font-size: 32px;
  }
`;

const PostArea = styled.textarea`
  width: 900px;
  height: 497px;
  padding: 20px;
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(205, 205, 205, 0.9);
  border-radius: 5px;
  border: none;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
  resize: none;
  outline: none;
  border-radius: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PostLength = styled.div`
  position: absolute;
  bottom: 120px;
  left: calc(100% - 100px);
`;

const VoiceContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 150px;
  left: calc(100% - 550px);
  display: flex;
  margin: 50px auto;
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

const TempSaveButton = styled.div`
  width: 100px;
  height: 50px;
  position: absolute;
  bottom: 100px;
  left: calc(50% - 400px);
  cursor: pointer;
`;

const PostButton = styled.a`
  position: absolute;
  bottom: -80px;
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
