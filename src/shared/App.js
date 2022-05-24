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
import {userApi} from "../apis/userApi";
import { ReactQueryDevtools } from "react-query/devtools";


function App() {
    const queryClient = new QueryClient();
    const dispatch = useDispatch();
    const cookie = getCookie("accessToken");
    const isLogin = useSelector(((state) => state.userSlice.isLogin));
    const { pathname } = useLocation();

    useEffect(() => {
        if (cookie) {
            dispatch(loginCheck());
        }
    }, []);

    return (
        <React.Fragment>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/write" element={<WriteDiary />} />
                <Route path="/diarylist" element={<DiaryList />} />
                <Route path="/diary/:id" element={<DiaryDetail />} />
                <Route path="/chat/:id" element={ isLogin ? <ChatDetail /> : <Main/>} />
                <Route path="/chatlist" element={<ChatList />}/>
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/alert" element={<Notifications />} />
                <Route path="/lottery" element={<Lottery />} />
                <Route path="/lotterywin" element={<LotteryWin />} />
                <Route path={"*"} element={<NotFound />} />
                <Route path="/intro" element={<Intro />} />
            </Routes>
            <ErrorModal/>
            <ReactQueryDevtools initialIsOpen={false} />
            { pathname !== "/intro" && <Feedback/> }
        </React.Fragment>
    );
}

export default App;
