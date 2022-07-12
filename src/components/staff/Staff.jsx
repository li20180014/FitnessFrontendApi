import React,{useState,useEffect} from 'react'
import './staff.css'
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import coachService from '../../services/coach.service';


const Staff = () => {

  const [data,setData] = useState(null);

  useEffect(() => {
    coachService.getCoaches().then((response) => {
      setData(response.data);
    });

  }, []);

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
        {data!== null && data.map((i) => (
          <SwiperSlide key={i.id} className="staff">
            <div className="staff__avatar">
              <img src={i.imageSrc} alt="coach" />
            </div>
            <h5 className="trainer__name">{i.firstName+" "+i.lastName}</h5>
            <small className="trainer__desc">{i.biography}</small>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
    )
}

export default Staff