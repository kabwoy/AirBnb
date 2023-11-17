import React, {useEffect} from 'react'
import axios  from 'axios'
import { useParams } from 'react-router-dom'

const SingleBooking = () => {
    
    const {id } = useParams()
    const deleteBooking = async ( )=>{
        await axios.delete(`http://localhost/5005/${id}`)
       
    }
    useEffect(()=>{
        deleteBooking()
    })
  return (
    <div>
        
    </div>
  )
}

export default SingleBooking