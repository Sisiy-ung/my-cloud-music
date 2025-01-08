import React, {useEffect} from 'react'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import { forceCheck } from 'react-lazyload';
import { Content } from './style';
import Scroll from '../../baseUI/scroll/index';
import { connect } from 'react-redux';
import * as actionTypes from './store/actionCreators';
import Loading from '../../baseUI/loading/index';


function Recommend(props) {

  const { bannerList, recommendList, enterLoading } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect (() => {
    // 如果页面有数据，则不发请求
    //immutable 数据结构中长度属性 size
    if (!bannerList.size){
      getBannerDataDispatch ();
    }
    if (!recommendList.size){
      getRecommendListDataDispatch ();
    }
    //eslint-disable-next-line
  }, []);
  // const bannerList = [1,2,3,4].map(item => {
  //   return {imageUrl: 'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg'}
  // })

  // const recommendList = [1,2,3,4,5,6,7,8,9,10].map(item => {
  //   return {
  //     id: 1,
  //     picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
  //     playCount: 17171122,
  //     name: "朴树、许巍、李健、郑钧、老狼、赵雷"
  //   }
  // })

  const bannerListJS = bannerList ? bannerList.toJS () : [];
  const recommendListJS = recommendList ? recommendList.toJS () :[];
  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList> 
        </div>
      </Scroll>
      {/* { enterLoading ? <Loading></Loading> : null } */}
    </Content>
  )
}

// 映射redux的state到组件的state上
const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn (['recommend', 'recommendList']),
  enterLoading: state.getIn (['recommend', 'enterLoading'])
}) 

// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch () {
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch () {
      dispatch(actionTypes.getRecommendList())
    }
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Recommend))