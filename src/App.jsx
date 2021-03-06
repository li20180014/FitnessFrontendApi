import React from 'react'
import './index.css'
import Header from './common/header/Header'
import Footer from './common/footer/Footer'
import Home from './pages/Home'
import SignIn from './common/login/SignIn'
import SignUp from './common/login/SignUp'
import Exercise from './pages/Exercise'
import Profile from './pages/Profile'
import Blog from './pages/Blog'
import CreateBlog from './components/blog/CreateBlog'
import ExerciseDetails from './pages/ExerciseDetails'
import BlogPost from './components/blog/BlogPost'
import Schedules from './pages/Schedules'
import Trainings from './pages/Trainings'
import { Dashboard } from './pages/Dashboard'
import CoachTrainings from './pages/CoachTrainings'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Header/>
      <Routes>
      <Route path ="/" element={<Home/>}/>
      <Route path ="/login" element={<SignIn/>}/>
      <Route path ="/schedules" element={<Schedules/>}/>
      <Route path ="/registration" element={<SignUp/>}/>
      <Route path ="/blog" element={<Blog/>}/>
      <Route path ="/create-blog" element={<CreateBlog/>}/>
      <Route path ="/blog-post" element={<BlogPost/>}/>
      <Route path ="/exercises" element={<Exercise/>}/>
      <Route path ="/profile" element={<Profile/>}/>
      <Route path="/exercise/:id" element={<ExerciseDetails />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/trainings" element={<Trainings />} />
      <Route path="/your-trainings" element={<CoachTrainings />} />
      </Routes>
    <Footer/>
    </>
  )
}

export default App
