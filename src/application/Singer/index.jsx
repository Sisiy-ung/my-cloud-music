import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from "./style";
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../baseUI/header/index'
import Scroll from "../../baseUI/scroll/index";
import SongList from '../SongList/index';
import { HEADER_HEIGHT } from "./../../api/config";
import { getSingerInfo, changeEnterLoading } from "./store/actionCreators";
import { connect } from "react-redux";
import Loading from "./../../baseUI/loading/index";
function Singer(props) {
    const navigate = useNavigate();
    const [showStatus, setShowStatus] = useState(true)
    const {
        artist: immutableArtist,
        songs: immutableSongs,
        loading,
    } = props;

    const { getSingerDataDispatch } = props;

    const artist = immutableArtist.toJS();
    const songs = immutableSongs.toJS();
    // 图片初始高度
    const initialHeight = useRef(0)
    // 往上偏移的尺寸
    const OFFSET = 5
    const collectButton = useRef();
    const imageWrapper = useRef()
    const songScrollWrapper = useRef()
    const layer = useRef()
    const songScroll = useRef();
    const header = useRef();
    const id = useParams().id
    useEffect(() => {
        if (id) {
            getSingerDataDispatch(id);
        }
    }, [getSingerDataDispatch, id]); // 添加 id 作为依赖项

    useEffect(() => {

        /* 由于歌曲列表是相对于 Container 绝对定位且 top 为 0，
        因此初始化时，我们将歌曲列表的 top 设置为整个图片的高度，
        正好处在图片下方，不然列表就会与图片重叠 */

        // 获取图片的高度
        if (artist && imageWrapper.current && songScroll.current) {
            let h = imageWrapper.current.offsetHeight;
            songScrollWrapper.current.style.top = `${h - OFFSET}px`;
            initialHeight.current = h;
            layer.current.style.top = `${h - OFFSET}px`;
            songScroll.current.refresh();
        }
    }, [artist]);
    const setShowStatusFalse = useCallback(() => {
        setShowStatus(false);
    }, []);

    const handleScroll = pos => {
        let height = initialHeight.current;
        const newY = pos.y;
        const imageDOM = imageWrapper.current;
        const buttonDOM = collectButton.current;
        const headerDOM = header.current;
        const layerDOM = layer.current;
        const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

        const percent = Math.abs(newY / height);
        //说明: 在歌手页的布局中，歌单列表其实是没有自己的背景的，layerDOM其实是起一个遮罩的作用，给歌单内容提供白色背景
        //因此在处理的过程中，随着内容的滚动，遮罩也跟着移动
        if (newY > 0) {
            //处理往下拉的情况,效果：图片放大，按钮跟着偏移
            imageDOM.style["transform"] = `scale(${1 + percent})`;
            buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
            layerDOM.style.top = `${height - OFFSET + newY}px`;
        } else if (newY >= minScrollY) {
            //往上滑动，但是还没超过Header部分
            layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
            layerDOM.style.zIndex = 1;
            imageDOM.style.paddingTop = "75%";
            imageDOM.style.height = 0;
            imageDOM.style.zIndex = -1;
            buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
            buttonDOM.style["opacity"] = `${1 - percent * 2}`;
        } else if (newY < minScrollY) {
            //往上滑动，但是超过Header部分
            layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
            layerDOM.style.zIndex = 1;
            //防止溢出的歌单内容遮住Header
            headerDOM.style.zIndex = 100;
            //此时图片高度与Header一致
            imageDOM.style.height = `${HEADER_HEIGHT}px`;
            imageDOM.style.paddingTop = 0;
            imageDOM.style.zIndex = 99;
        }
    };


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
                    <Scroll ref={songScroll} onScroll={handleScroll}>
                        <SongList songs={songs} showCollect={false}>
                        </SongList>
                    </Scroll>
                </SongListWrapper>
                {loading ? (<Loading></Loading>) : null}
            </Container>

        </CSSTransition>
    )
}
const mapStateToProps = state => ({
    artist: state.getIn(["singerInfo", "artist"]),
    songs: state.getIn(["singerInfo", "songsOfArtist"]),
    loading: state.getIn(["singerInfo", "loading"]),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
    return {
        getSingerDataDispatch(id) {

            dispatch(changeEnterLoading(true));
            dispatch(getSingerInfo(id));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));
