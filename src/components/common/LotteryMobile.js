import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useStore from "../../zustand/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../apis/userApi";
import { Layout } from "./index";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import CategoryBar from "../../shared/CategoryBar";
import Loading from "../../shared/Loading";

import { color } from "../../utils/designSystem";
import {
    mobileLotteryMoon,
    mobileStar,
    mobileCircleIcon,
    mobileRecommendIcon,
    mobileBananaMilkIcon,
    mobileLotteryResultCresent,
} from "../../static/images/resources";


const LotteryMobile = () => {
    return (
        <React.Fragment>

        </React.Fragment>
    );
};

export default LotteryMobile;

// 모바일 웹이 웹과 너무 달라서 별도의 뷰를 만들 필요가 있음.
// 이건 5/25 배포 이후에 작업
