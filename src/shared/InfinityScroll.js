import React, { useCallback, useEffect } from "react";
import _ from "lodash";
import Loading from "./Loading";

const InfinityScroll = (props) => {
    const { children, callNext, hasNext, isLoading } = props;

    const _handleScroll = _.throttle(() => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;

        // scroll 계산
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if ((scrollHeight = innerHeight - scrollTop < 200)) {
            if (isLoading) {
                return;
            }
        }
        callNext();
    }, 300);

    const handleScroll = useCallback(_handleScroll, [loading]);

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
            {hasNext && <Loading />}
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
