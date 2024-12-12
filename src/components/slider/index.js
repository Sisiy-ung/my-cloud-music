import { SliderContainer } from './style';
import React, { useEffect, useState } from 'react';

import Swiper from 'swiper';

import "swiper/dist/css/swiper.css";
function Slider(props) {
    const { bannerList } = props;
    const [sliderSwiper, setSliderSwiper] = useState(null)

    useEffect( () => {
        if(bannerList.length && !sliderSwiper) {
            let newSliderSwiper = new Swiper(".slider-container", {
                loop: true,
                autoplay: {
                  delay: 3000,
                  disableOnInteraction: false,
                },
                pagination: {el:'.swiper-pagination'},
              });
            setSliderSwiper(newSliderSwiper)
        }

    }, [bannerList.length, sliderSwiper])


    return (
        <SliderContainer>
            <div className="before"></div>
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