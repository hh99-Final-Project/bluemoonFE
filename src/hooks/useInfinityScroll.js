import React, {useState} from "react";
import _ from "lodash";


export default function useInfinityScroll() {

    // const [isLoading, setIsLoading] = useState(true);
    const [dataList, setDataList] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(null);


    const InfinityScroll = _.throttle((e) => {
        // 실제 요소의 높이값
        // console.log(e.target.scrollHeight);

        // 스크롤 위치
        //  console.log(e.target.scrollTop);

        // 현재 보여지는 요소의 높이 값 (border, scrollbar 크기 제외)
        // console.log(e.target.clientHeight);

        if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) <= 200 && hasNext) {
            chatApi.getChatList(page).then((response) => {
                console.log(response);
                setChatList([...dataList, ...response.data]);
                // setIsLoading(false);
                if (response.data.length < 5) {
                    setHasNext(false);
                } else {
                    setHasNext(true);
                }
                setPage(page + 1);
            });
        }
    }, 300);


return {InfinityScroll};

};