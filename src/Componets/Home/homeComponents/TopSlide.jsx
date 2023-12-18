import React from 'react'
import img1 from '../../../Assets/images/blog-img-1.jpeg'
import img2 from '../../../Assets/images/blog-img-2.jpeg'
import img5 from '../../../Assets/images/slider-image-1.jpeg'
import img6 from '../../../Assets/images/slider-image-2.jpeg'
import img7 from '../../../Assets/images/slider-image-3.jpeg'
import Slider from 'react-slick'

export default function TopSlide() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    }
    
    return <>
        <div className="row mb-5 mt-2 g-0 spac">
            <div className="col-md-8">
                <Slider {...settings}> 
                    <img height={400} className='w-100' src={img5} alt="" />
                    <img height={400} className='w-100' src={img6} alt="" />
                    <img height={400} className='w-100' src={img7} alt="" />
                </Slider>
            </div>
            <div className="col-md-4">
                <img height={200} className='w-100' src={img1} alt="" />
                <img height={200} className='w-100' src={img2} alt="" />
            </div>
        </div>

    </>
}
