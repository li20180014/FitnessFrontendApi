import React from 'react'
import './index.css'
import Header from './common/header/Header'
import Footer from './common/footer/Footer'
import Home from './pages/Home'
import SignIn from './common/login/SignIn'
import SignUp from './common/login/SignUp'
import Checkout from './common/cart/Checkout'
import Exercise from './pages/Exercise'
import Profile from './pages/Profile'
import Blog from './pages/Blog'
import CreateBlog from './components/blog/CreateBlog'
import ExerciseDetails from './pages/ExerciseDetails'
import BlogPost from './components/blog/BlogPost'
import { Routes, Route } from 'react-router-dom'

const App = () => {


  return (
    <>
    <Header/>
      <Routes>
      <Route path ="/" element={<Home/>}/>
      <Route path ="/login" element={<SignIn/>}/>
      <Route path ="/registration" element={<SignUp/>}/>
      <Route path ="/blog" element={<Blog/>}/>
      <Route path ="/create-blog" element={<CreateBlog/>}/>
      <Route path ="/blog-post" element={<BlogPost/>}/>
      <Route path ="/checkout" element={<Checkout/>}/>
      <Route path ="/exercises" element={<Exercise/>}/>
      <Route path ="/profile" element={<Profile/>}/>
      <Route path="/exercise/:id" element={<ExerciseDetails />} />
      </Routes>
    <Footer/>
    </>
  )
}

export default App
