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
