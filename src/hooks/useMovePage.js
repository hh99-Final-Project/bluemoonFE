import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../zustand/store";



export default function useMovePage() {

    const navigate = useNavigate();

    const { diaryContent, setDiaryContent, setCurrentHeader } = useStore();

    const setCategoryBarName = (path) => {
        switch (path) {
            case '/diarylist' :
                setCurrentHeader('고민상담');
                break;
            case '/wtire' :
                setCurrentHeader('포스트');
                break;
            case '/' :
                setCurrentHeader('홈');
                break;
            case '/mypage' :
                setCurrentHeader('마이페이지');
                break;
            case '/chatlist' :
                setCurrentHeader('채팅');
                break;
            case '/lottery':
                setCurrentHeader('추첨');
                break;
            // default :
            //     setCurrentHeader('홈')
        }
    }

    const moveToPage = (path) => {

        if (path !== "/write") {
            if (diaryContent.length > 0) {
                if (window.confirm("작성중인데 나가시겠습니까?")) {
                    navigate(path);
                    setCategoryBarName(path);
                    setDiaryContent("");
                } else {
                    return;
                }
            } else {
                navigate(path);
                setCategoryBarName(path);
            }
        } else {
            //현재 다이어리 페이지에서 작성중일때,
            if(diaryContent.length > 0) {
                return;
            } else {
                navigate(path);
                setCategoryBarName(path);
            }
        }


    }

    return {
        moveToPage

    }
}
