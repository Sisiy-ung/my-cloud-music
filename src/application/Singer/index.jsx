import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from "./style";
import { useNavigate } from 'react-router-dom';
import Header from '../../baseUI/header/index'
import Scroll from "../../baseUI/scroll/index";
import SongList from '../SongList/index';

function Singer(props) {
    const navigate = useNavigate();
    const [showStatus, setShowStatus] = useState(true)
    const artist = {
        picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
        name: "薛之谦",
        hotSongs: [
            {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            },
            {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            },
            // 省略 20 条
        ]
    }
    // 图片初始高度
    const initialHeight = useRef(0)
    // 往上偏移的尺寸
    const OFFSET = 5
    const collectButton = useRef ();
    const imageWrapper = useRef()
    const songScrollWrapper = useRef()
    const layer = useRef()
    const songScroll = useRef();
    const header = useRef();
    useEffect(() => {
        /* 由于歌曲列表是相对于 Container 绝对定位且 top 为 0，
        因此初始化时，我们将歌曲列表的 top 设置为整个图片的高度，
        正好处在图片下方，不然列表就会与图片重叠 */

        // 获取图片的高度
        let h = imageWrapper.current.offsetHeight
        // 歌曲列表
        songScrollWrapper.current.style.top = `${h - OFFSET}px`
        initialHeight.current = h
        layer.current.style.top = `${h - OFFSET} px`;
        songScroll.current.refresh()
    })
    const setShowStatusFalse = useCallback(() => {
        setShowStatus(false);
    }, []);


    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => navigate(-1)}
        >
            <Container>
                <Header handleClick={setShowStatusFalse}
                    title={artist.name}
                    ref={header}></Header>
                <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
                    <div className="filter"></div>
                </ImgWrapper>
                <CollectButton ref={collectButton}>
                    <i className="iconfont">&#xe62d;</i>
                    <span className="text"> 收藏 </span>
                </CollectButton>

                <BgLayer ref={layer}></BgLayer>

                {/* 由于歌曲列表是相对于 Container 绝对定位且 top 为 0，因此初始化时，我们将歌曲列表的 top 设置为整个图片的高度，正好处在图片下方，不然列表就会与图片重叠 */}

                <SongListWrapper ref={songScrollWrapper}>
                    <Scroll ref={songScroll}>
                        <SongList songs={artist.hotSongs} showCollect={false}>
                        </SongList>
                    </Scroll>
                </SongListWrapper>
            </Container>
        </CSSTransition>
    )
}

export default React.memo(Singer);
