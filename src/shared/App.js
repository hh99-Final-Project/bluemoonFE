import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import SignUp from "../pages/SignUp";
import WriteDiary from "../pages/WriteDiary";
import DiaryList from "../pages/DiaryList";
import SelectMode from "../pages/SelectMode";
import DiaryDetail from "../pages/DiaryDetail";
import ChatDetail from "../pages/ChatDetail";
import ChatList from "../pages/ChatList";
import MyPage from "../pages/MyPage";
import { Notifications } from "../components/common";
import NotFound from "../pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/post" element={<WriteDiary />} />
      <Route path="/diarylist" element={<DiaryList />} />
      <Route path="/select" element={<SelectMode />} />
      <Route path="/diary/:id" element={<DiaryDetail />} />
      <Route path="/chat/:id" element={<ChatDetail />} />
      <Route path="/chatlist" element={<ChatList />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/alert" element={<Notifications />} />
      <Route path={"*"} element={<NotFound />}/>
    </Routes>
  );
}

export default App;
