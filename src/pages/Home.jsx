import React from 'react'
import About from '../components/about/About'
import Contact from '../components/contact/Contact'
import Cards from '../components/cards/Cards'
import images from '../components/slider/images'
import Slider from '../components/slider/Slider'
import Staff from '../components/staff/Staff'
import Map from '../components/map/Map'

const location = {
  address: 'Mihaila Avramovića 22, Beograd 11000',
  lat: 44.768483525854485, 
  lng: 20.460130738629548,
} 

const Home = () => {
  return (
    <div style={{backgroundColor: "#1A1A1D"}}>
      <Slider images = {images}/>
      <About/>
      <Cards/>
      <Staff/>
      <Contact/>
      <Map location={location} zoomLevel={17} /> 
    </div>
  )
}

export default Home
