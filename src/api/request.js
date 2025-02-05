import { axiosInstance } from "./config";

export const getBannerRequest = () => {
    return axiosInstance.get('/banner')
}

export const getRecommendListRequest = () => {
    return axiosInstance.get('/personalized')
}

export const getHotSingerListRequest = (count) => {
    return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getRankListRequest = () => {
    return axiosInstance.get(`/toplist/detail`);
};

export const getAlbumDetailRequest = id => {
    return axiosInstance.get(`/playlist/detail?id=${id}`);
};


export const getSingerInfoRequest = id  => {
    return axiosInstance.get(`/artists?id=${id}`)
}

// -1:全部
// 1:男歌手
// 2:女歌手
// 3:乐队
// area取值：
// -1:全部
// 7华语
// 96欧美
// 8:日本
// 16韩国
// 0:其他

export const categoryMap = new Map([
    ['1001', { type: 1, area: 7 }],
    ['1002', { type: 2, area: 7 }],
    ['1003', { type: 3, area: 7 }],
    ['2001', { type: 1, area: 96 }],
    ['2002', { type: 2, area: 96 }],
    ['2003', { type: 3, area: 96 }],
    ['6001', { type: 1, area: 8 }],
    ['6002', { type: 2, area: 8 }],
    ['6003', { type: 3, area: 8 }],
    ['7001', { type: 1, area: 16 }],
    ['7002', { type: 2, area: 16 }],
    ['7003', { type: 3, area: 16 }],
    ['4001', { type: 1, area: 0 }],
    ['4002', { type: 2, area: 0 }],
    ['4003', { type: 3, area: 0 }],
]);
export const getSingerListRequest = (category, alpha, offset) => {
    console.log(category, alpha, offset, 'getSingerListRequest参数');

    const { type, area } = !!category ? categoryMap.get(category) : {};
    return axiosInstance.get(
        `/artist/list?${type && area ? `type=${type}&area=${area}` : ''
        }&initial=${alpha && alpha.toLowerCase()}&offset=${offset}`
    );
}
