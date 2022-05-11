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
import VoicePopup from "../components/diary/VoicePopup";
import backIcon from "../static/images/diary/backToList.svg";
import saveIcon from "../static/images/diary/saveDiary.svg";
import recordIcon from "../static/images/diary/voiceRecordIcon.svg";
import listenIcon from "../static/images/diary/voiceListenIcon.svg";
import { Layout } from "../components/common";
import { useQuery, useMutation, useQueryClient } from "react-query";

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
    deleteVoice,
    onRec,
    finishRecord,
    isPlaying,
    isPaused
  } = useRecordVoice();

  const [title, setTitle] = useState("");
  const [diary, setDiary] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenVoicePopup, setIsOpenVoicePopup] = useState(false);

  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const queryClient = useQueryClient();

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

  //useMutaion을 통해 등록 및 post가 일어나면 기존 쿼리 무효화
  const mutation = useMutation(() => diaryApi.createPost(title, diary, audioUrl), {
    onSuccess: () => {
      queryClient.invalidateQueries('diary');
      queryClient.invalidateQueries('reminders');
    }
  });

  if(mutation.isSuccess){
    window.alert('작성 완료에요!');
    navigate('/mypage');
  } else if (mutation.isError) {
    window.alert('작성에 오류가 발생했어요! 다시 시도해주세요 😂')
  }


  const onClickHandler = (e) => {

    if(!userInfo){
      window.alert('로그인하셔야 등록 가능합니다!')
      return;
    }

    mutation.mutate(title, diary, audioUrl);
  };


  const closeVoicePopup = () => {
    setIsOpenVoicePopup(false);
  }


  useEffect(()=>{
    setCurrentHeader('포스트')
  }, [])

  return (
      <Layout>
        <WriteContainer>
          {/*<button onClick={() => navigate('/diary/1')}>다이어리 페이지 이동</button>*/}
          <Header/>
          <CategoryBar/>
          <PostAreaContainer>
            <DiaryName>
              {userInfo?.nickname} <span>님 다이어리</span>
            </DiaryName>
            <PostHeader>
              <BackToListButton src={backIcon}/>
              <SaveDiaryButton onClick={onClickHandler} src={saveIcon}/>
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
              <RecordArea onClick={() => setIsOpenVoicePopup(true)}>
                <img src={recordIcon} alt={"record"}/>
                <div>음성 등록</div>
              </RecordArea>
              <ListenArea>
                <img src={listenIcon} alt={"listen"}/>
                <div>음성 듣기</div>
              </ListenArea>

              {/*<VoicePlayButton onClick={play}>재생</VoicePlayButton>*/}
              {/*<VoiceRecordButton onClick={recordVoice}>녹음</VoiceRecordButton>*/}
              {/*<VoiceStop onClick={stopRecord}>중지</VoiceStop>*/}
              {/*<VoiceTempStop onClick={pause}>일시정지</VoiceTempStop>*/}
              {/*<VoiceTempReplay onClick={replay}>다시시작</VoiceTempReplay>*/}
              {/*<DeleteVoice onClick={deleteVoice}>삭제</DeleteVoice>*/}
              {/*<OpenPopup onClick={() => setIsOpenVoicePopup(true)}>열기</OpenPopup>*/}
            </VoiceLeft>
            <PostLength>{diary.length}/1000</PostLength>

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
            isOpenVoicePopup &&
            <VoicePopup
                closePopup={closeVoicePopup}
                play={play}
                recordVoice={recordVoice}
                pause={pause}
                stopRecord={stopRecord}
                finishRecord={finishRecord}
                isPlaying={isPlaying}
                onRec={onRec}
                isPaused={isPaused}
                replay={replay}
            />
          }
        </WriteContainer>
      </Layout>
  );
}

export default WriteDiary;

const WriteContainer = styled.div`
  width: 100%;
  height: 100vh;
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

const DiaryName = styled.div`
  position: absolute;
  right: 0;
  bottom: calc(100% + 10px);
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  line-height: 19px;
  
  span {
   color: #9AEBE7; 
  }
`;


const PostHeader = styled.div`
  width: 100%;
  height: 52px;
  background-color: #2F3A5F;
  margin: 23px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackToListButton = styled.img`
  margin-left: 39px;
  cursor: pointer;
`;
const SaveDiaryButton = styled.img`
  margin-right: 34px;
  cursor: pointer;
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
  padding: 14px 27px;
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
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
  padding: 18px 27px;
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
  bottom: 45px;
  left: 69px;
`;

const RecordArea = styled.div`
  color: #08105D;
  font-size: 8px;
  line-height: 10px;
  margin-right: 18px;
  text-align: center;
  
  img {
    cursor: pointer;
  }
  
  div {
    margin-top: 7px;
  }

`;
const ListenArea = styled(RecordArea)``;

const PostLength = styled.div`
  position: absolute;
  bottom: 50px;
  right: 65px;
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
