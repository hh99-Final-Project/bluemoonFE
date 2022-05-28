import React, {useCallback} from "react";
import styled from "styled-components";


const RecommendInput = ({recommender, setRecommender}) => {

    const onChangeRecommender = useCallback((e) => {
        setRecommender(e.target.value);
    },[]);


    return (
        <RecommendPersonInput
            placeholder="추천인은 1000p, 회원가입한 사람은 500p"
            onChange={onChangeRecommender}
            value={recommender}
            name="recommender"
        />
    );
};


export default React.memo(RecommendInput);


const RecommendPersonInput = styled.input`
    position: absolute;
    width: 539.47px;
    height: 40.85px;
    display: block;
    top: 315px;
    left: 205px;
    outline: none;
    border: none;
    padding-left: 21px;

    background: rgba(198, 211, 236, 0.8);
    border-radius: 5px;

    &::placeholder {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        color: #43567e;
    }

    @media only screen and (max-width: 420px) {
        width: 164px;
        height: 41px;
        position: static;
        margin: 2vh auto 0;
    }
`;