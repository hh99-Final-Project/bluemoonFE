import React, {useCallback} from "react";
import styled from "styled-components";


const SignupInput = ({nickName, setIsValidNickName, setNickName, nickNameCheckDB}) => {

    const onChange = useCallback((e) => {
        if (e.target.value === "") {
            setIsValidNickName(null);
            setNickName(e.target.value);
            return;
        } else if (e.target.value !== "") {
            const result = /^[a-zA-zㄱ-힣0-9]{1,10}$/.test(e.target.value);
            if (result) {
                nickNameCheckDB(e.target.value);
            } else {
                setIsValidNickName(false);
            }
        }

        setNickName(e.target.value);
    },[]);


    return (
        <NickNameInput
            placeholder="10자 이내 (특수문자, 공백 불가)"
            onChange={onChange}
            value={nickName}
            name="nickName"
        />
    );
};


export default React.memo(SignupInput);


const NickNameInput = styled.input`
    position: absolute;
    width: 539.47px;
    height: 40.85px;
    display: block;
    top: 173px;
    left: 205px;
    outline: none;
    padding-left: 21px;
    background: rgba(198, 211, 236, 0.8);
    border-radius: 5px;
    border: none;

    &::placeholder {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        color: #43567e;
    }

    &:focus {
        border: 1px solid #333333;
    }

    @media only screen and (max-width: 420px) {
        width: 164px;
        height: 41px;
        position: static;
        margin: 2vh auto 0;

        &::placeholder {
            font-size: 10px;
            line-height: 13px;

            color: #43567e;
        }
    }
`;