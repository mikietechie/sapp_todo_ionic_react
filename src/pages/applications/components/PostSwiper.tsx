import {  IonicSlides } from "@ionic/react"
import { IPost } from "../data/structs";
import React from "react";
import { fmtMediaUrl } from "../../../data/functions/filters";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';
import './PostSwiper.scss'


export const PostSwiper: React.FC<{posts: (IPost|any)[]}> = ({posts }) => {
    return (
        <Swiper
            autoplay={{ delay: 500 }}
            speed={500}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            modules={[EffectFade, IonicSlides, Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
            breakpoints={{
                576: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 10
                }
            }}
        >
            {
                posts.map((post, i) => (
                    <SwiperSlide
                        style={{
                            backgroundImage: `url("${fmtMediaUrl(post.image)}")`,
                        }}
                        key={i}
                    >
                        <div className="swiper-slide-content">
                            <Link to={`/post/${post.id}`}>
                                <h2>{post.title}</h2>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}