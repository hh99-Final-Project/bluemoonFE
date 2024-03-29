import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "../pages/Main";
import SignUp from "../pages/SignUp";
import WriteDiary from "../pages/WriteDiary";
import DiaryList from "../pages/DiaryList";
import DiaryDetail from "../pages/DiaryDetail";
import ChatDetail from "../pages/ChatDetail";
import ChatList from "../pages/ChatList";
import MyPage from "../pages/MyPage";
import { Feedback, Notifications } from "../components/common";
import NotFound from "../pages/NotFound";
import Lottery from "../pages/Lottery";
import LotteryWin from "../pages/LotteryWin";
import Intro from "../pages/Intro";
import ErrorModal from "../shared/ErrorModal";
import { getCookie } from "../utils/cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginCheck } from "../redux/modules/userSlice";
import { userApi } from "../apis/userApi";
import { ReactQueryDevtools } from "react-query/devtools";
import {Helmet} from "react-helmet";

function App() {
    const dispatch = useDispatch();
    const token =  localStorage.getItem("accessToken");
    const isLogin = useSelector((state) => state.userSlice.isLogin);
    const isAlreadyCheckIntro = localStorage.getItem("isShowIntro");
    const { pathname } = useLocation();


    useEffect(() => {
        if (token) {
            dispatch(loginCheck());
        }
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <title>Bluemoon</title>
                <meta name="description" content="bluemoon" />
                <meta property="og:url" content="https://bluemoondiary.com"/>
            </Helmet>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/write" element={<WriteDiary />} />
                <Route path="/diarylist" element={<DiaryList />} />
                <Route path="/diary/:id" element={<DiaryDetail />} />
                <Route path="/chat/:id" element={isLogin ? <ChatDetail /> : <Main />} />
                <Route path="/chatlist" element={<ChatList />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/alert" element={<Notifications />} />
                <Route path="/lottery" element={<Lottery />} />
                <Route path="/lotterywin" element={<LotteryWin />} />
                <Route path={"*"} element={<NotFound />} />
                <Route path="/intro" element={<Intro />} />
            </Routes>
            <ErrorModal />
            <ReactQueryDevtools initialIsOpen={false} />
            {isAlreadyCheckIntro === "true" && <Feedback />}
        </React.Fragment>
    );
}

export default App;
