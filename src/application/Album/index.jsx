import React, { useEffect, useState, useCallback } from 'react'
import { Container, TopDesc, Menu, SongList, SongItem } from './style'
import { CSSTransition } from 'react-transition-group'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../baseUI/header/index'
import Scroll from '../../baseUI/scroll';
import { getName } from './../../api/utils';
import { getAlbumList, changePullUpLoading, changeEnterLoading } from './store/actionCreators';
import { connect } from 'react-redux';
import { isEmptyObject } from './../../api/utils';
import Loading from '../../baseUI/loading/index';

function Album(props) {
  const navigate = useNavigate();
  const [showStatus, setShowStatus] = useState(true)

  const { currentAlbum: currentAlbumImmutable, enterLoading } = props
  const { getAlbumDataDispatch } = props
  const id = useParams().id

  const handleBack = useCallback (() => {
    setShowStatus (false);
  }, []);
  useEffect(() => {
    getAlbumDataDispatch(id)
  }, [getAlbumDataDispatch, id])

  let currentAlbum = currentAlbumImmutable.toJS();
  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{Math.floor(currentAlbum.subscribedCount / 1000) / 10}万</span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    )
  };

  const renderMenu = () => {
    return (

      <div>
        <Menu>
          <div>
            <i className="iconfont">&#xe6ad;</i>
            评论
          </div>
          <div>
            <i className="iconfont">&#xe86f;</i>
            点赞
          </div>
          <div>
            <i className="iconfont">&#xe62d;</i>
            收藏
          </div>
          <div>
            <i className="iconfont">&#xe606;</i>
            更多
          </div>
        </Menu>
      </div>
    )
  };

  const renderSongList = () => {
    return (
      <SongList>
        <div className="first_line">
          <div className="play_all">
            <i className="iconfont">&#xe6e3;</i>
            <span > 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
          </div>
          <div className="add_list">
            <i className="iconfont">&#xe62d;</i>
            <span > 收藏 </span>
          </div>
        </div>
        <SongItem>
          {
            currentAlbum.tracks.map((item, index) => {
              return (
                <li key={index}>
                  <span className="index">{index + 1}</span>
                  <div className="info">
                    <span>{item.name}</span>
                    <span>
                      {getName(item.ar)} - {item.al.name}
                    </span>
                  </div>
                </li>
              )
            })
          }
        </SongItem>
      </SongList>
    )
  }
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExit={() => navigate(-1)}>
      <Container>
        <Header title={"返回"} handleClick={handleBack}></Header>
        {!isEmptyObject(currentAlbum) ?
          (<Scroll
            bounceTop={false}
            style={{ height: '600px' }}
          >
            {renderTopDesc()}
            {renderMenu()}
            {renderSongList()}
          </Scroll>) : null
        }
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  enterLoading: state.getIn(['album', 'enterLoading']),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getAlbumList(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));