import React, { useState, useEffect } from 'react'
import axios from 'axios'

import '../styles/components/SingleColour.scss'

const SingleColour = (props) => {
  
  const [data, setData] = useState({})

  useEffect(() => {
    axios.get(`/api/colours/${props.match.params.id}`)
      .then(resp => setData(resp.data))
      .catch(err => console.log(err))
  }, [])

  if (!data || !data.user ) return <div>Loading...</div>
  else return  <section className="section">
    <figure className="image">
      <div id="colourImage" style={{ backgroundColor: `#${data.hex}` }}></div>
    </figure>

    <div className="title">{data.name}</div>
    <p>RGB: {data.rgb && data.rgb.join(', ')}</p>
    <p>Hex: {data.hex && data.hex}</p>

    <small>Created by: {data.user && data.user.username}</small>
    
  </section>

}


export default SingleColour