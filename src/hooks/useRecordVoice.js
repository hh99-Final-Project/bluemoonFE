import React, { useState, useEffect } from "react";

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

    useEffect(() => {
        if (audioUrl) {
            let audio = new Audio(URL.createObjectURL(audioUrl));
            audio.loop = false;
            audio.volume = 1;

            //오디오가 종료되면 일시정지에서 다시 재생버튼으로 돌아오세요...
            audio.onended = (e) => {
                toggleListening();
            };
            setMyAudio(audio);
        }
    }, [audioUrl]);

    //재생중인지, 일시정지인지
    const toggleListening = () => {
        setIsListening((prev) => !prev);
        setIsPlaying((prev) => !prev);
    };

    //음성 녹음하기
    const recordVoice = () => {
        // audioContext 생성
        // 음원 정보를 담은 노드를 생성한다.
        // Web Audio API 사용을 위해 오디오 컨텍스트 인스턴스 생성
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // ScriptProcessorNode를 만든다.
        // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
        // bufferSize 는 256, 512, 1024, 2048 과 같은 값을 가짐.
        // bufferSize 에 0을 입력하면, 환경에서 가장 최적의 butter size 를 찾음
        const analyser = audioCtx.createScriptProcessor(0, 1, 1);
        setAnalyser(analyser);

        function makeSound(stream) {
            // MediaStreamAudioSourceNode 를 만든다.
            // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
            const source = audioCtx.createMediaStreamSource(stream);
            setAudioCtx(audioCtx);
            setSource(source);

            // AudioBufferSourceNode 연결
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
        }

        //유저 마이크 사용 권한 획득 후 녹음 시작
        // MediaDevice.getUserMedia 메소드를 통해 유저의 카메라, 마이크 등을 기기로부터 입력 받을 수 있다.
        //promise를 반환하므로, then()으로 받아 이후 작업 진행
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
        // dataavailable 이벤트 핸들러의 인자로 전달되는 the event 객체에는 data 속성이 있으며,
        // source에서 생성되는 Blob 형의 데이터를 참조하고 있다.
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
        // 스트리밍이 끝나면 명시적으로 disconnect 해줘야 한다.
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
        if (myAudio) {
            myAudio.play();
            setIsPlaying(true);
        }
    };

    const playingPause = () => {
        if (myAudio) {
            myAudio.pause();
        }
    };

    const playingStop = () => {
        if (myAudio) {
            myAudio.currentTime = 0;
            myAudio.pause();
        }
    };

    //파일 삭제
    const deleteVoice = () => {
        setFinishRecord(false);
        setOnRec(true);
        setAudioUrl("");
    };

    //녹음을 완전히 끝내기
    const completeRecord = () => {
        setIsShowSpeaker(true);
    };

    const resetShowSpeaker = () => {
        setIsShowSpeaker(false);
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
        resetShowSpeaker,
    };
}
