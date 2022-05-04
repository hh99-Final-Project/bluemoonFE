import React, { useEffect, useRef } from "react";
import styled from "styled-components";


const TestScroll = () => {

    let array = new Array(25).fill("안녕하세요");
    const boxRef = useRef();

    const detectScroll = (e) => {
        if(e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
            //바닥에 닿았음
            // 여기서 paging api 요청
            console.log("야호 바닥이다")
        }

    }


    return (
        <Container>
            <ScrollContainer
                ref={boxRef}
                onScroll={detectScroll}>
                {
                    array.map((t, idx) => {
                        return (
                            <div key={idx}>{t}</div>
                        )
                    })
                }

            </ScrollContainer>
        </Container>
    )
}

export default TestScroll;


const Container = styled.div`
  margin: 300px auto 0;
  width: 500px;
  height: 400px;
  background-color: #DDDDDD;
`;
const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  
`