import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import Popup from "../shared/Popup";

Post.propTypes = {

};

function Post(props) {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [diary, setDiary] = useState("");
    const [stream, setStream] = useState();
    const [media, setMedia] = useState();
    const [source, setSource] = useState();
    const [onRec, setOnRec] = useState(true);
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
    const [audioCtx, setAudioCtx] = useState();
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const onChangeTitleHandler = (e) => {
        setTitle(e.target.value);
    }

    const onChangeContentHandler = (e) => {
        //일단 최대 길이를 800자로만 설정했습니다. 기획에 따라 변동합니다.
        if(diary.length > 800){
            return;
        }
        setDiary(e.target.value);
    }

    const onClickHandler = (e) => {
        // api 연동 (voice 보내기 or 다이어리 내역 보내기)
        //일단 쓰고 있다고 가정하고, 쓰고 있는데 나갈거냐는 팝업을 띄워본다.
        setIsOpenPopup(true);
    }


    //음성 녹음하기
    const recordVoice = () => {

        // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
        const analyser = audioCtx.createScriptProcessor(0, 1, 1);
        setAnalyser(analyser);

        function makeSound(stream) {
            // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
            const source = audioCtx.createMediaStreamSource(stream);
            setSource(source);
            setAudioCtx(audioCtx);

            // AudioBufferSourceNode 연결
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
        }


        //유저 마이크 사용 권한 획득 후 녹음 시작
        navigator.mediaDevices.getUserMedia({audio: true}).then((stream)=>{
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            setStream(stream);
            setMedia(mediaRecorder);
            makeSound(stream);

            //음성 녹음이 시작됐을 때, onRec state를 false로 변경
            analyser.onaudioprocess = function (e) {
                setOnRec(false);
            }


        })
    }

    const stopRecord = () => {
        media.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
        };
        // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
        stream.getAudioTracks().forEach(function (track) {
            track.stop();
        });

        // 미디어 캡처 중지
        media.stop();

        // 메서드가 호출 된 노드 연결 해제
        analyser.disconnect();
        source.disconnect();
    }

    //녹음 조건 정하기
    if(analyser){
        analyser.onaudioprocess = function (e) {
            // 5분(300초) 지나면 자동으로 음성 저장 및 녹음 중지
            if (e.playbackTime > 300) {
                stream.getAudioTracks().forEach(function (track) {
                    track.stop();
                });

                media.stop();
                // 메서드가 호출 된 노드 연결 해제
                analyser.disconnect();
                audioCtx.createMediaStreamSource(stream).disconnect();

                //오디오 저장해주기
                media.ondataavailable = function (e) {
                    setAudioUrl(e.data);
                    setOnRec(true);
                };
            } else {
                setOnRec(false);
            }
        };
    }

    //일시 정지
    const pause = () => {
        media.onpause = e => {
            media.requestData();
        }
    }

    const replay = () => {
        // if(media.state === "recording"){
        //     media.pause();
        // }

        if(media.state === "paused"){
            media.resume();
        }
    }



    // 파일 출력 & 재생
    const play = useCallback(() => {
        const sound = new File([audioUrl], "recordedVoice", { lastModified: new Date().getTime(), type: "audio" });

        if(audioUrl){
            const audio = new Audio(URL.createObjectURL(audioUrl));
            audio.loop = false;
            audio.volume = 1;
            audio.play();
        }


    }, [audioUrl])




    return (
        <React.Fragment>
            <PostTitle>
                고민 털어놓기
            </PostTitle>
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
                </VoiceContainer>

                <PostButton onClick={onClickHandler}>
                    등록하기
                </PostButton>
            </PostAreaContainer>

            {isOpenPopup &&
            <Popup
                title={"작성중이신데 나가실건가요?"}
                desc={"레알 진짜?"}
                close={()=> setIsOpenPopup(false)}
                event={() => navigate('/diarylist')}
            />
            }
        </React.Fragment>
    )
}

export default Post;


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
    background-color: #E0E0E0;
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
        color: #A59F9F;
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
`
const VoicePlayButton = styled.div`
    width: 70px;
    height: 50px;
    background-color: #828282;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const VoiceRecordButton = styled(VoicePlayButton)`
`

const VoiceStop = styled(VoicePlayButton)``;
const VoiceTempStop = styled(VoicePlayButton)``;
const VoiceTempReplay = styled(VoicePlayButton)``;


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
    background-color: #C4C4C4;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9px;
    cursor: pointer;
`;