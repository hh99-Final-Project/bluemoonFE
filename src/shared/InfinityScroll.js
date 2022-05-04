import React, { useCallback, useEffect, useRef } from "react";
import _ from "lodash";
import Loading from "./Loading";

const InfinityScroll = (props) => {
    const { children, callNext, hasNext, isLoading } = props;

    const test = document.getElementById("container");
    console.log(test.offsetHeight);

    const _handleScroll = _.throttle(() => {
        // const { innerHeight } = window;
        const { scrollHeight } = document.body;
        console.log(innerHeight);
        console.log(scrollHeight);

        // 전체 높이
        const innerHeight = document.getElementById("container").clientHeight;
        console.log(innerHeight);

        // scroll 계산
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if (scrollHeight - innerHeight - scrollTop < 200) {
            if (isLoading) {
                return;
            }
        }
        callNext();
    }, 300);

    const handleScroll = useCallback(_handleScroll, [isLoading]);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (hasNext) {
            window.addEventListener("scroll", handleScroll);
        } else {
            window.removeEventListener("scroll", handleScroll);
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasNext, isLoading]);

    return (
        <React.Fragment>
            {children}
            {/* {hasNext && <Loading />} */}
        </React.Fragment>
    );
};

InfinityScroll.defaultProps = {
    children: null,
    callNext: () => {},
    hasNext: false,
    isLoading: false,
};

export default InfinityScroll;
