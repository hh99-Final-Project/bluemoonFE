import React from "react";
import styled from "styled-components";
import { replyIcon, listenIcon } from "../../static/images/resources";
import { convertDate } from "../../utils/convertDate";


const ReplyComment = (props) => {

    const { replyComments } = props;
    // const reversedList = replyComments.reverse();

    return (
        <ReplyCommentList>
            {
                replyComments.map((comment, idx) => {
                    return (
                        <OneReplyComment key={idx}>
                            <NickNameArea>
                                <NickNameAreaLeft>
                                    <ReplyImg src={replyIcon}/>
                                    <Nickname>
                                        {comment.nickname}의 답글
                                    </Nickname>
                                </NickNameAreaLeft>
                                <Time>
                                    {convertDate(comment.createdAt)}
                                </Time>
                            </NickNameArea>

                            <Content>
                                {comment.content}
                            </Content>
                            <IconArea>
                                <VoiceIcon src={listenIcon}/>
                                <OptionIconArea>
                                    <ChattingIcon>
                                        채팅
                                    </ChattingIcon>
                                    <DeleteIcon>
                                        삭제
                                    </DeleteIcon>
                                </OptionIconArea>
                            </IconArea>
                        </OneReplyComment>
                        );

                })

            }
        </ReplyCommentList>
    );
};

export default ReplyComment;


const ReplyCommentList = styled.div`
  width: 876px;
  height: 100%;
`;
const OneReplyComment = styled.div`
  background-color: rgba(149, 158, 190, 0.8);
  margin-top: 9px;
  border-radius: 5px;
  padding: 15px 44px;
  box-sizing: border-box;
`;

const NickNameArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NickNameAreaLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReplyImg = styled.img``;
const Nickname = styled.div`
  font-size: 17px;
  line-height: 21px;
  color: #08105D;
`;
const Time = styled.div`
  font-size: 10px;
  line-height: 13px;
  color: #354569;
`;
const Content = styled.div`
  margin: 7px 0 8px;
  font-size: 13px;
  line-height: 16px;
  color: #08105D;
`;
const IconArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const VoiceIcon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const OptionIconArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ChattingIcon = styled.div`
  font-size: 10px;
  line-height: 13px;
  color: #36466B;
  cursor: pointer;
  
`;
const DeleteIcon = styled(ChattingIcon)`
  margin-left: 10px;
`;



