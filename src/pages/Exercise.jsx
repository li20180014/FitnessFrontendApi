import React, {useState} from 'react'
import { Box } from '@mui/material';
import SearchExercises from '../components/exercise/SearchExercises';
import Exercises from '../components/exercise/Exercises';
import '../components/exercise/exercise.css'

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <Box sx ={{backgroundColor: 'white', mt:0}}>
    <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
    <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} /> 
    </Box>
  )
}

export default Exercise