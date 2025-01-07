// reducer 加工函数

// 初始化state在reducer.js里面进行

import * as actionTypes from './constants'

import { fromJS } from 'immutable'

const defaultState = fromJS({
    bannerList: [],
    recommendList: []
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_BANNER: 
            return state.set('bannerList', action.data)
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data)
        default:
            return state
    }
} 