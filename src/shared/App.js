import React from "react";
import { Route, Routes } from 'react-router-dom';
import Main from "../pages/Main";
import SignUp from "../pages/SignUp";
import Post from "../pages/Post";
import DiaryList from "../pages/DiaryList";
import SelectToDiary from "../pages/SelectToDiary";
import DiaryDetail from "../pages/DiaryDetail";
import Chat from "../pages/Chat";
import ChatList from "../pages/ChatList";
import MyPage from "../pages/MyPage";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/post' element={<Post/>}/>
            <Route path='/diarylist' element={<DiaryList/>}/>
            <Route path='/select' element={<SelectToDiary/>}/>
            <Route path='/diary/:id' element={<DiaryDetail/>}/>
            <Route path='/chat/:id' element={<Chat/>}/>
            <Route path='/chatlist' element={<ChatList/>}/>
            <Route path='/mypage' element={<MyPage/>}/>
        </Routes>
    );
}

export default App;
