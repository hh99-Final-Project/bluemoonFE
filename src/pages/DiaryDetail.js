import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { DiaryContent, CommentContainer } from "../components/diary";
import { diaryApi } from "../apis/diaryApi";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Loading from "../shared/Loading";
import { useSelector } from "react-redux";
import CategoryBar from "../shared/CategoryBar";
import { convertDate } from "../utils/convertDate";
import { Layout } from "../components/common";
import {useQuery, useQueryClient} from "react-query";
import useStore from "../zustand/store";
import { color } from "../utils/designSystem";
import { backIcon } from "../static/images/resources";
import { useMediaQuery } from "react-responsive";
import { getCookie } from "../utils/cookie";

DiaryDetail.propTypes = {};

function DiaryDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const postId = params.id;
    const queryClient = useQueryClient();
    const isLogin = useSelector(((state) => state.userSlice.isLogin));
    const token = !!getCookie("accessToken");

    const isMobile = useMediaQuery({
        query: "(max-width: 420px)",
    });

    const loginDetail = useQuery(["diaryDetail", 1, postId], () => diaryApi.getOneDiary(postId), {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        enabled: isLogin,
        cacheTime: 1000 * 60 * 60 * 24,
        retry: 2
    });

    const nonLoginDetail = useQuery(["diaryDetail", 2, postId], () => diaryApi.getNotLoginUserDetail(), {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        enabled: !isLogin,
        cacheTime: 1000 * 60 * 60 * 24,
    });

    const { setCurrentHeader } = useStore();

    useEffect(() => {
        setCurrentHeader("고민상담");
        queryClient.invalidateQueries("diaryList");
    }, []);

    if (loginDetail.isLoading || nonLoginDetail.isLoading) {
        return <Loading />;
    }

    return (
        <Layout>
            <DetailContainer>
                <Header />
                {!isMobile ? <CategoryBar /> : <MobileTitle>고민 상담소</MobileTitle>}
                <DetailContent BgColor={color.containerBoxColor}>
                    <TitleContainer>
                        <TitleLeft>
                            <BackButton src={backIcon} onClick={() => navigate("/diarylist")} />
                            <Title>{isLogin ? loginDetail.data.title : nonLoginDetail.data.title}</Title>
                        </TitleLeft>
                        <Time>
                            {convertDate(isLogin ? loginDetail.data.createdAt : nonLoginDetail.data.createdAt)}
                        </Time>
                    </TitleContainer>
                    <ContentContainer>
                        <DiaryContent diary={isLogin ? loginDetail.data : nonLoginDetail.data} />
                        <CommentContainer
                            diary={isLogin ? loginDetail.data : nonLoginDetail.data}
                            postId={postId}
                        />
                    </ContentContainer>
                </DetailContent>
            </DetailContainer>
            <Footer />
        </Layout>
    );
}

export default DiaryDetail;

const DetailContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;
const DetailContent = styled.div`
    width: 950px;
    height: 530px;
    padding-right: 5px;
    background: ${(props) => props.BgColor};
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
    box-shadow: 0 0 70px #465981;
    backdrop-filter: blur(80px);
    border-radius: 25px;
    margin: auto;

    @media only screen and (max-width: 420px) {
        width: 320px;
        background: none;
        box-shadow: none;
        border: none;
    }
`;

const MobileTitle = styled.div`
    width: 320px;
    height: 34px;
    color: #ffffff;
    margin: auto;
    text-align: center;
`;

const TitleContainer = styled.div`
    width: 100%;
    height: 52px;
    background-color: #2f3a5f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 23px auto 0;

    @media only screen and (max-width: 420px) {
        width: 320px;
        height: 43px;
        background: #3d4a74;
        border: 1px solid #5c6290;
        border-radius: 5px;
        padding: 12px 11px;
        box-sizing: border-box;
        margin-bottom: 16px;
        margin-top: 0;
    }
`;

const ContentContainer = styled.div`
    height: 433px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0 32px 0 37px;
    overflow-x: hidden;
    overflow-y: auto;

    @media only screen and (max-width: 420px) {
        width: 320px;
        padding: 0;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d3d3d3;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
        background-color: #616b7d;
        border-radius: 5px;
    }
`;

const TitleLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BackButton = styled.img`
    cursor: pointer;
    margin: 0 21px 0 40px;

    @media only screen and (max-width: 420px) {
        display: none;
    }
`;

const Title = styled.div`
    margin: auto;
    font-size: 18px;
    line-height: 18px;
    color: #d0cccc;
    max-width: 700px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    @media only screen and (max-width: 420px) {
        font-size: 15px;
        line-height: 19px;
        color: #c6d3ec;
    }
`;

const Time = styled.div`
    font-size: 12px;
    line-height: 15px;
    color: #c6d3ec;
    margin-right: 32px;

    @media only screen and (max-width: 420px) {
        margin-right: 0;
    }
`;
