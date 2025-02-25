import React, { useRef, useEffect,  useContext } from 'react'
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { 
  NavContainer,
  ListContainer,
  List,
  ListItem,
} from "./style";
import Scroll from "../../baseUI/scroll/index";
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList,
  changeCategory
} from './store/actionCreators';
import {connect} from 'react-redux';
import  LazyLoad from 'react-lazyload';
import {CHANGE_ALPHA, CHANGE_CATEGORY, CategoryDataContext} from './data'
import { useNavigate, Outlet  } from 'react-router-dom';
function Singers(props) {
  const scrollRef = useRef(null);
  // let [category, setCategory] = useState('')
  // let [alpha, setAlpha] = useState('')
  const {data, dispatch} = useContext (CategoryDataContext);
  const {category, alpha} = data.toJS ();
  const { singerList, pageCount, pullUpLoading, pullDownLoading,} = props;
  const { getHotSinger, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if(!singerList.length && !category && !alpha) {
      getHotSinger();
    }
  }, [singerList.length, category, alpha, getHotSinger]);
  // const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
  //   return {
  //     picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
  //     name: "隔壁老樊",
  //     accountId: 277313426,
  //   }
  // })

  let handleUpdateAlpha = (val) => {
    dispatch ({type: CHANGE_ALPHA, data: val});
    updateDispatch(category, val);
  }

  let handleUpdateCategory = (val) => {
    dispatch ({type: CHANGE_CATEGORY, data: val});
    console.log(category, 'category');

    updateDispatch(val, alpha);
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch (category, alpha, category === '', pageCount);
  };
  
  const handlePullDown = () => {
    pullDownRefreshDispatch (category, alpha);
  };

  const enterDetail = (id) => {
    navigate(`/singers/${id}`)
  }

  // // 分类
  // const handleUpdateCategory = (newVal) => {
  //   console.log(newVal, category, 'handleUpdateCategory');
    
  //   if(category === newVal) return;
  //   updateCategory(newVal);
  //   scrollRef.current.refresh();
  // };

  // // 首字母
  // const handleUpdateAlpha = (newVal) => {
  //   if(alpha === newVal) return;
  //   updateAlpha(newVal);
  //   scrollRef.current.refresh();
  // };

  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.toJS().map((item, index) => {
            return (
              <ListItem key={item.id + "" + index} onClick={() => enterDetail(item.id)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }

      </List>

    )
  }

  return (
    <div>
      {/* better-scroll 的 (横向) 滚动原理，首先外面容器要宽度固定，其次内容宽度要大于容器宽度。 */}
      <NavContainer>
        <Horizen list={categoryTypes} title={"分类 (默认热门):"}
          handleClick={(v) => handleUpdateCategory(v)} oldVal={category}></Horizen>
        <Horizen list={alphaTypes} title={"首字母:"}
          handleClick={handleUpdateAlpha} oldVal={alpha}></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
          ref={ scrollRef }
          pullUp={ handlePullUp }
          pullDown = { handlePullDown }
          pullUpLoading = { pullUpLoading }
          pullDownLoading = { pullDownLoading }
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
      <Outlet /> 
    </div>
  )
}
// 映射redux的state到组件的state上
const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
}) 

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSinger() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count+1));
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));//属于重新获取数据
      if(category === '' && alpha === ''){
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    },
    updateCategory(newVal) {
      dispatch(changeCategory(newVal))
      dispatch(getSingerList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))