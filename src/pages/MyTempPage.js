// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import { userApi } from "../apis/userApi";
// import { diaryApi } from "../apis/diaryApi";

// MyTempPage.propTypes = {};

// function MyTempPage(props) {
//     const navigate = useNavigate();
//     // const [myTempDiary, setMyTempDiary] = useState([]);

//     //더보기 모달의 '삭제하기' 에 onClick으로 연결해준다.
//     const deleteTempDiary = (postId) => {
//         diaryApi.deleteTempDiary(postId).then((response) => {
//             console.log(response);
//         });
//     };

//     // useEffect(() => {
//     //     let page = 1;
//     //     userApi.getMyTempPage().then((response) => {
//     //         setMyTempDiary(response.data);
//     //     });
//     // }, []);

//     const myTempDiary = [
//         {
//             postId: 1,
//             title: "임시저장 제목1",
//             content: "내용을 입력중...",
//         },
//         {
//             postId: 2,
//             title: "임시저장 제목2",
//             content: "내용을 입력중...",
//         },
//     ];

//     return (
//         <React.Fragment>
//             <Grid>
//                 <Select>
//                     <button onClick={() => navigate("/mypage")}>내가 쓴 고민</button>
//                     <button onClick={() => navigate("/mypage/temp")}>임시저장본 </button>
//                 </Select>
//                 {myTempDiary.map((diary) => {
//                     return (
//                         <DiaryCard onClick={() => navigate(`/diary/${diary.postId}`)} key={diary.postId}>
//                             <Text>{diary.title}</Text>
//                             <Text>{diary.content}</Text>
//                             <button
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     deleteTempDiary(diary.postId);
//                                 }}
//                             >
//                                 임시저장 삭제
//                             </button>
//                         </DiaryCard>
//                     );
//                 })}
//             </Grid>
//         </React.Fragment>
//     );
// }

// export default MyTempPage;

// const Grid = styled.div`
//     width: 80vw;
//     height: 80vh;
//     margin: 20vh auto 0;
//     display: flex;
//     flex-direction: column;
//     background-color: lightgray;
// `;

// const Select = styled.div`
//     height: 10%;
//     align-items: right;
// `;

// const DiaryCard = styled.div`
//     width: 90%;
//     height: 15%;
//     display: flex;
//     flex-direction: column;
//     background-color: #999;
//     border: 1px solid black;
//     border-radius: 10px;
//     margin: 1% auto;
//     padding: 10px;
// `;

// const Text = styled.p``;
