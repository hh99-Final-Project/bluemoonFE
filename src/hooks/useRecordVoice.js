import React, {useState, useCallback} from "react";

export default function useRecordVoice() {

    const [stream, setStream] = useState();
    const [media, setMedia] = useState();
    const [source, setSource] = useState();
    const [onRec, setOnRec] = useState(true);
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
    const [audioCtx, setAudioCtx] = useState();

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
            setAudioCtx(audioCtx);
            setSource(source);

            // AudioBufferSourceNode 연결
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
        }

        //유저 마이크 사용 권한 획득 후 녹음 시작
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
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
    };



    //녹음 조건 정하기
    if (analyser) {
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
        media.pause();
    };

    const replay = () => {
        // if(media.state === "recording"){
        //     media.pause();
        // }

        if (media.state === "paused") {
            media.resume();
        }
    };

    // 파일 출력 & 재생
    const play = useCallback(() => {
        if (audioUrl) {
            const audio = new Audio(URL.createObjectURL(audioUrl));
            audio.loop = false;
            audio.volume = 1;
            audio.play();
        }
    }, [audioUrl]);


    return {
        recordVoice,
        stopRecord,
        pause,
        replay,
        play,
        audioUrl
    }
}