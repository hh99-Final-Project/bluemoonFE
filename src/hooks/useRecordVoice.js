import React, {useState, useRef, useEffect} from "react";

export default function useRecordVoice() {

    const [stream, setStream] = useState();
    const [media, setMedia] = useState();
    const [source, setSource] = useState();
    const [onRec, setOnRec] = useState(true);
    const [finishRecord, setFinishRecord] = useState(false);
    const [isShowSpeaker, setIsShowSpeaker] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isListeningPaused, setIsListeningPaused] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
    const [audioCtx, setAudioCtx] = useState();
    const [myAudio, setMyAudio] = useState();


    useEffect(()=>{
        if(audioUrl){
            let audio = new Audio(URL.createObjectURL(audioUrl));
            audio.loop = false;
            audio.volume = 1;

            //오디오가 종료되면 일시정지에서 다시 재생버튼으로 돌아오세요...
            audio.onended = (e) => {
                toggleListening();
            };
            setMyAudio(audio);
        }

        return () => {
            console.log("hook에서 unmount?");
        };

    },[audioUrl]);


    //재생중인지, 일시정지인지
    const toggleListening = () => {
        setIsListening(prev => !prev);
    };

    //음성 녹음하기
    const recordVoice = () => {
        // 음원 정보를 담은 노드를 생성한다.
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
        const analyser = audioCtx.createScriptProcessor(0, 1, 1);
        setAnalyser(analyser);

        function makeSound(stream) {
            // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
            const source = audioCtx.createMediaStreamSource(stream);
            setAudioCtx(audioCtx);
            setSource(source);

            // AudioBufferSourceNode 연결
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
        }

        //유저 마이크 사용 권한 획득 후 녹음 시작
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            //사용자가 허용을 눌렀을때, 녹음을 시작할 수 있다. audio stream을 통해 녹음 객체를 만들어준다.
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.start();
            setStream(stream);
            setMedia(mediaRecorder);
            makeSound(stream);

            //음성 녹음이 시작됐을 때, onRec state를 false로 변경
            analyser.onaudioprocess = function (e) {
                setOnRec(false);
            };
        });
    };

    const stopRecord = () => {
        // blob 객체를 내보내는 메서드
        media.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
            setFinishRecord(true);
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
    };



    //녹음 조건 정하기
    if (analyser) {
        analyser.onaudioprocess = function (e) {
            // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
            if (e.playbackTime > 180) {
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
    const recordPause = () => {
        media.pause();
        setIsPaused(true);
    };

    const replay = () => {
        // if(media.state === "recording"){
        //     media.pause();
        // }

        if (media.state === "paused") {
            media.resume();
            setIsPaused(false);
        }
    };


    // 파일 출력 & 재생

    const play = () => {
        if (myAudio){
            myAudio.play();
            setIsPlaying(true);
        }
    };

    const playingPause = () => {
        if(myAudio){
            myAudio.pause();

        };
    };

    const playingStop = () => {
        if(myAudio){
            myAudio.currentTime = 0;
            myAudio.pause();
        }
    };


    //파일 삭제
    const deleteVoice = () => {
        setAudioUrl("");
    };

    //녹음을 완전히 끝내기
    const completeRecord = () => {
        setIsShowSpeaker(true);
    };

    const playingHandler = (bool) => {
        setIsPlaying(bool);
    };

    //모든 상태 초기화
    const recordReset = () => {
        setOnRec(true);
        setFinishRecord(false);
        setIsPlaying(false);
        setIsPaused(false);
    };


    return {
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
        isListening,
        playingStop,
        myAudio,
        analyser
    };
}