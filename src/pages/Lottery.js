import React, {useEffect} from "react";
import styled from "styled-components";
import CategoryBar from "../shared/CategoryBar";
import useStore from "../zustand/store";


const Lottery = () => {

    const {setCurrentHeader} = useStore();

    useEffect(()=>{
        setCurrentHeader('추첨');
    },[])

    return (
        <div style={{width: '100%', marginTop:'200px'}}>
            <CategoryBar/>
            <Title>
                블루문 런칭 이벤트
            </Title>
            <Desc>
                추첨을 통해 바나나 우유 기프티콘을 드립니다. <br/>
                200포인트로 참여 가능합니다. <br/>
                포인트는 다이어리 작성 혹은 댓글 작성으로 모을 수 있습니다.
            </Desc>
            <LotteryArea>

            </LotteryArea>
            <Result>
                결과창
            </Result>
            <RecommendIcons>
                친구 추천하기
            </RecommendIcons>
        </div>
    )
}

export default Lottery;

const Title = styled.div`
  margin: 0 auto 100px;
  text-align: center;
  font-size: 60px;
  font-weight: bold;
`;
const Desc = styled.div`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
`;
const LotteryArea = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #DDDDDD;
  margin: 100px auto 200px;
`;
const Result = styled.div`
  text-align: center;
  font-size: 60px;
  cursor: pointer;
`;
const RecommendIcons = styled.div`
  text-align: center;
  font-size: 30px;
  cursor: pointer;
  margin: 80px auto 40px;
`;