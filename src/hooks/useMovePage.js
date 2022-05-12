import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../zustand/store";



export default function useMovePage() {

    const navigate = useNavigate();

    const { diaryContent, setDiaryContent } = useStore();

    const moveToPage = (path) => {
        console.log(typeof(path))
        if(path !== "write" && diaryContent.length > 0) {
            if(window.confirm("작성중인데 나가시겠습니까?")){
                navigate(path);
                setDiaryContent("");
            } else {
                return;
            }

        }




    }

    return {
        moveToPage

    }
}
