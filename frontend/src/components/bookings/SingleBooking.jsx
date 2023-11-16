import React, {useState, useEffect} from 'react'
import axios  from 'axios'
import { useParams } from 'react-router-dom'

const SingleBooking = () => {
    
    const loading = useState(false)
    const {id } = useParams()
    const deleteBooking = async ( )=>{
        const response = await axios.delete(`http://localhost/5005/${id}`)
        ret
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