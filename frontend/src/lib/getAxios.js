import { useState, useEffect } from 'react'
import axios from 'axios'

const getAxios = (url, initalState = []) => {

  const [data, setData] = useState(initalState)
  
  useEffect(() => {
    axios.get(url)
      .then(resp => setData(resp.data))
      .catch(err => console.log(err))
  }, [])

  return data
}

export default getAxios