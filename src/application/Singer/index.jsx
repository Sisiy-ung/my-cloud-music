import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from "./style";
import { useNavigate } from 'react-router-dom';
import Header from '../../baseUI/header/index'
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
                <Header title={"头部"}></Header>
                <ImgWrapper bgUrl={artist.picUrl}>
                    <div className="filter"></div>
                </ImgWrapper>
                <CollectButton>
                    <i className="iconfont">&#xe62d;</i>
                    <span className="text"> 收藏 </span>
                </CollectButton>

                <BgLayer></BgLayer>

                <SongListWrapper>
                </SongListWrapper>
            </Container>

        </CSSTransition>
    )
}

export default React.memo(Singer);
