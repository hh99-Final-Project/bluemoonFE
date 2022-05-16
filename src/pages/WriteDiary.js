import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryBar from "../shared/CategoryBar";
import Header from "../shared/Header";
import useRecordVoice from "../hooks/useRecordVoice";
import useMovePage from "../hooks/useMovePage";

import Popup from "../shared/Popup";
import { diaryApi } from "../apis/diaryApi";
import useStore from "../zustand/store";
import {useSelector} from "react-redux";
import VoicePopup from "../components/diary/VoicePopup";
import { backIcon, saveIcon, recordIcon, listenIcon, listenVoiceIcon } from "../static/images/resources";
import { Layout } from "../components/common";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {color} from "../utils/designSystem";


function WriteDiary() {
  const navigate = useNavigate();
  const { setCurrentHeader } = useStore();

  const {
    recordVoice,
    stopRecord,
    recordPause,
    replay,
    play,
    audioUrl,
    deleteVoice,
    onRec,
    finishRecord,
    isPlaying,
    isPaused,
    completeRecord,
    isShowSpeaker,
    recordReset,
    playingPause,
    playingHandler,
    toggleListening,
    isListening
  } = useRecordVoice();

  const [title, setTitle] = useState("");
  const [diary, setDiary] = useState("");
  const [recordTime, setRecordTime] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenVoicePopup, setIsOpenVoicePopup] = useState(false);

  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const { setDiaryContent } = useStore();
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
    setDiaryContent(e.target.value);
  };

  const SaveRecordTime = (time) => {
    setRecordTime(time);
  };

  //useMutaion을 통해 등록 및 post가 일어나면 기존 쿼리 무효화
  const mutation = useMutation(() => diaryApi.createPost(title, diary, audioUrl, recordTime), {
    onSuccess: () => {
      queryClient.invalidateQueries("diary");
      queryClient.invalidateQueries("reminders");
    }
  });

  if(mutation.isSuccess){
    window.alert("작성 완료에요!");
    navigate("/mypage");
  } else if (mutation.isError) {
    window.alert("작성에 오류가 발생했어요! 다시 시도해주세요 😂");
  }

  const onClickHandler = (e) => {

    if(!userInfo){
      window.alert("로그인하셔야 등록 가능합니다!");
      return;
    }

    mutation.mutate(title, diary, audioUrl, recordTime);
  };


  const closeVoicePopup = () => {
    setIsOpenVoicePopup(false);
  };

  const handler = (e) => {
    if(diary.length > 0 ) {
      e.preventDefault();
      e.returnValue = "작성 중인데 정말 나가시겠습니까?";
    }
  };


  useEffect(()=>{
    setCurrentHeader("포스트");
  },[]);

  useEffect(()=>{
      window.addEventListener("beforeunload", handler);

    return () => {
        window.removeEventListener("beforeunload", handler);
      setDiaryContent("");
    };

  }, [diary]);


  return (
      <Layout>
        <WriteContainer>
          <Header/>
          <CategoryBar/>
          <PostAreaContainer BgColor={color.containerBoxColor}>
            { userInfo &&
              <DiaryName>
                {userInfo.nickname} 님 다이어리
              </DiaryName>
            }
            <PostHeader>
              <BackToListButton src={backIcon}/>
              <SaveDiaryButton onClick={onClickHandler} src={saveIcon}/>
            </PostHeader>
            <WriteArea>
              <PostText
                placeholder="제목을 작성해주세요"
                onChange={onChangeTitleHandler}
              />
              <PostArea isShowSpeaker={isShowSpeaker}
                placeholder={ isShowSpeaker ? "" : "1000자 내로 작성해주세요" }
                onChange={onChangeContentHandler}
              />
              {isShowSpeaker &&
              <div>
                <SpeakerIcon onClick={play} src={listenVoiceIcon}/>
                <TimeArea>{recordTime}</TimeArea>
              </div>
              }
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
                recordPause={recordPause}
                stopRecord={stopRecord}
                finishRecord={finishRecord}
                isPlaying={isPlaying}
                onRec={onRec}
                isPaused={isPaused}
                replay={replay}
                completeRecord={completeRecord}
                recordReset={recordReset}
                SaveRecordTime={SaveRecordTime}
                deleteVoice={deleteVoice}
                playingPause={playingPause}
                playingHandler={playingHandler}
                toggleListening={toggleListening}
                isListening={isListening}
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
  background: ${props => props.BgColor};
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
  position: relative;
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
  padding: ${(props) => (props.isShowSpeaker ? "65px 27px" : "18px 27px;")}; 
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

const SpeakerIcon = styled.img`
  position: absolute;
  left: 67px;
  top: 77px;
  cursor: pointer;
`;

const TimeArea = styled.div`
  position: absolute;
  left: 116px;
  top: 86px;
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
