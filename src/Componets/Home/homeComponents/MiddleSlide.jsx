import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from 'react-slick'

export default function MiddleSlide() {
    function getCategory() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    let { data } = useQuery('catSlide', getCategory)
    // console.log(data?.data.data);
    const settings = {
        arrows:false,
        dots:true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true
    }
    return <>
        <h3>Shop Poupler Categories </h3>
        <div className="py-3">
            <Slider {...settings}>
                {data?.data.data.map((cat , ind) => <img key={ind} height={200} src={cat.image} alt=''></img>)}
            </Slider>
        </div>
    </>
}
