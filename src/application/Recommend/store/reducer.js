// 初始化state在reducer.js里面进行

import * as actionTypes from './constants'

import { fromJS } from 'immutable'

const defaultState = fromJS({
    bannerList: [],
    recommendList: []
})