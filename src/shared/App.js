import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "../pages/Main";
import SignUp from "../pages/SignUp";
import WriteDiary from "../pages/WriteDiary";
import DiaryList from "../pages/DiaryList";
import DiaryDetail from "../pages/DiaryDetail";
import ChatDetail from "../pages/ChatDetail";
import ChatList from "../pages/ChatList";
import MyPage from "../pages/MyPage";
import { Notifications } from "../components/common";
import NotFound from "../pages/NotFound";
import Lottery from "../pages/Lottery";
import Intro from "../pages/Intro";
import { getCookie } from "../utils/cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginCheck } from "../redux/modules/userSlice";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getAlertList } from "../redux/modules/commonSlice";

function App() {
    const queryClient = new QueryClient();
    const dispatch = useDispatch();
    const cookie = getCookie("authorization");
    const userInfo = useSelector((state) => state.userSlice.userInfo);

    useEffect(() => {
        if (cookie) {
            dispatch(loginCheck());
        }
    }, []);

    // useEffect(() => {
    //     if (userInfo) {
    //         wsConnect();
    //         return () => {
    //             wsDisConnect();
    //         };
    //     }
    // }, []);

    // let sock = new SockJS("http://121.139.34.35:8080/stomp/chat");
    // let ws = Stomp.over(sock);

    // function wsConnect() {
    //     try {
    //         ws.connect({ token: cookie }, () => {
    //             ws.subscribe(
    //                 `/sub/chat/room/${userInfo.userId}`,
    //                 (response) => {
    //                     const newAlert = JSON.parse(response.body);
    //                     console.log(newAlert.type);
    //                     if (newAlert.type === "ALARM") {
    //                         dispatch(getAlertList(newAlert));
    //                     }
    //                 },
    //                 // {},
    //             );
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // function wsDisConnect() {
    //     try {
    //         ws.disconnect(() => {
    //             ws.unsubscribe("sub-0");
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/write" element={<WriteDiary />} />
                <Route path="/diarylist" element={<DiaryList />} />
                <Route path="/diary/:id" element={<DiaryDetail />} />
                <Route path="/chat/:id" element={<ChatDetail />} />
                <Route path="/chatlist" element={<ChatList />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/alert" element={<Notifications />} />
                <Route path="/lottery" element={<Lottery />} />
                <Route path={"*"} element={<NotFound />} />
                <Route path="/intro" element={<Intro />} />
            </Routes>
        </QueryClientProvider>
    );
}

export default App;
