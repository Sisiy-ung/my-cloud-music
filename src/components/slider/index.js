import { SliderContainer } from './style';
import React from 'react';
function Slider(props) {
    const { bannerList } = props;
    return (
        <SliderContainer>
            <div className='slider-container'>
                {/* wrapper */}
                <div className='swiper-wrapper'>
                    {
                        bannerList.map(item => {
                            return (
                                <div className='swiper-slider' key={item.imageUrl}>
                                    <div className='slider-nav'>
                                        <img src={item.imageUrl} alt='推荐' width="100%" height="100" />
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>

                {/* pagination */}
                <div className='swiper-pagination'></div>

            </div>



        </SliderContainer>
    )
}
export default React.memo(Slider)