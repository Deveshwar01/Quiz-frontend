import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import TopicCard from './TopicCard';
import './Topics.css'

function Topics() {

  const [quizData ,setQuizData] = useState([]);

    useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async ()=>{
    try {
      const response = await fetch('http://localhost:3000/api/v1/topic');
  
      if(!response.ok){
         throw new Error('Failed to fetch topics'); 
      }
      
      const data = await response.json();
      setQuizData(data.topics);

    } 
    catch (error){
        console.log('Failed to fetch topics:', error);
    }

  }

 const navigation = useNavigate();

  useEffect(()=>{
      if(!localStorage.getItem('token'))
      {
          navigation('/')
      }
      else{
          navigation('/topics')
      }
  },[])


  return (
    <div>
       <div className='nav'>Start the Quizz</div>
       <div className='cardContainer'>
       {
          quizData.map(data => (
            <TopicCard key={data._id} topicData={data} />
          ))
       }
       </div>
    </div>
  )
}

export default Topics;