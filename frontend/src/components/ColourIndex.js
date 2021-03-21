import React from 'react'
import getAxios from '../lib/getAxios'

import '../styles/components/ColourIndex.scss'


const ColourIndex = () => {

  const data = getAxios('/api/colours/')

  return <section className="section">
    <div id="spectrum">
      {data
        .sort((a, b) => a.order - b.order)
        .map((item, id) => {
          return <div key={id}>
            <div className="colour" style={{ backgroundColor: `#${item.hex}` }}></div>
          </div>
        })
      }
    </div>
  </section>
}

export default ColourIndex