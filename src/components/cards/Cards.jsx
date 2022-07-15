import React from 'react'
import './cards.css'
import IMG1 from '../../assets/img5.jpg'
import IMG2 from '../../assets/img2.jpg'
import IMG3 from '../../assets/img3.jpg'



const Cards = () => {

  const data = [
    {

      id:1,
      image: IMG1,
      title: 'Cardio',
      desc: 'Cardio training should be an important lifestyle part of anyone who takes care of one’s body and health',
  
     
    },
    {

      id:2,
      image: IMG2,
      title: 'Functional Training',
      desc: 'Functional training allows you to do a whole-body training similar to your everyday activities. ',
   
      
      
    },
    {

      id:3,
      image: IMG3,
      title: 'Crossfit',
      desc: 'CrossFit can be used to accomplish any goal, from improved health to better performance.',

      
    },
    {

      id:4,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: 'Boxing',
      desc: 'Boxing training is the training method that boxers use in order to get more fit for their sport.',

      
    },
    {

      id:5,
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: 'Weightlifting',
      desc: 'Strength training or resistance training involves the performance of physical exercises that are designed to improve strength and endurance..',

      
    }, {

      id:6,
      image: "https://images.unsplash.com/photo-1579150110123-55a33bcfa5d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: 'Full Body Workout',
      desc: 'Full body workouts are one of the best workout splits for muscle growth and strength regardless of your training experience.',

      
    }
  ]


  return (

    <section id='portfolio'>
      <h5>Our Services</h5>
      <h2>Training</h2>

    <div className="container portfolio__container">
    {
      data.map(({id, image, title, desc}) => {
        return (
        
          <article key={id} className='portfolio__item'>
          <div className="portfolio__item-image">
          <img src={image} alt={title} />
          </div>

          <div className="item__desc">
          <h3>{title}</h3>
          <p>{desc}</p>
          {/* <div className="portfolio__item-cta">
          <a href={github} className='btn btn-primary'target='_blank'>Github</a>
          </div> */}
          </div>
  
          </article>
         

        )
    }
    
    )
  }

    </div>

    </section>

  )
}

export default Cards
