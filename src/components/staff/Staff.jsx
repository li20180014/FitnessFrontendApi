import React from 'react'
import av1 from '../../assets/av1.jpg'
import av2 from '../../assets/av2.jpg'
import './staff.css'
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";


const data = [
{
    id:1,
    avatar: av1,
    name: 'Lana Ilic',
    desc: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas repellat illum amet dolorem, quaerat quasi veniam animi at vitae incidunt facilis tenetur hic a reiciendis unde beatae sapiente eligendi porro. Quaerat quasi veniam animi at vitae incidunt facilis tenetur hic a reiciendis unde beatae sapiente eligendi porro.'
},
{
    id:2,
    avatar: av2,
    name: 'Lana Ilic',
    desc: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas repellat illum amet dolorem, quaerat quasi veniam animi at vitae incidunt facilis tenetur hic a reiciendis unde beatae sapiente eligendi porro. Quaerat quasi veniam animi at vitae incidunt facilis tenetur hic a reiciendis unde beatae sapiente eligendi porro.'
},
{
    id:3,
    avatar: av2,
    name: 'Lana Ilic',
    desc: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas repellat illum amet dolorem, quaerat quasi veniam animi at vitae incidunt facilis tenetur hic a reiciendis unde beatae sapiente eligendi porro. Quaerat quasi veniam animi at vitae incidunt facilis tenetur hic a reiciendis unde beatae sapiente eligendi porro.'
}
];

const Staff = () => {
  return (
    <section id="staff">
      <h5>Our Staff</h5>
      <h2>Highly Qualified Trainers</h2>
      <Swiper
        className="container staff__container"
        modules={[Pagination]}
        spaceBetween={50}
        pagination={{ clickable: true }}
      >
        {data.map((i) => (
          <SwiperSlide key={i.id} className="staff">
            <div className="staff__avatar">
              <img src={i.avatar} alt="" />
            </div>
            <h5 className="trainer__name">{i.name}</h5>
            <small className="trainer__desc">{i.desc}</small>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
    )
}

export default Staff