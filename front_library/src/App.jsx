import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [text, setText] = useState('Waiting for API..')

  useEffect(() => {
    axios.get('http://localhost:3000')
    .then(response => {
      setText(response.data)
    })
  }, [])
  
  return (
    <div className='text-center'>{text}</div>
  )
}

export default App
