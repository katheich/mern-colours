import React from 'react'
import { Link } from 'react-router-dom'
import getAxios from '../lib/getAxios'

import Grid from '@material-ui/core/Grid'

import '../styles/components/ColourIndex.scss'

const ColourIndex = () => {

  const data = getAxios('/api/colours/')

  return <Grid container 
    id="spectrum"
    direction="row"
    justify="flex-start"
    alignItems="center"
  >
    {data
      .sort((a, b) => a.order - b.order)
      .map((item, id) => {
        return <Grid item key={id}>
          <Link to={`/colours/${item._id}`} className="subtitle">
            <div className="colour" style={{ backgroundColor: `#${item.hex}` }}></div>
          </Link>
        </Grid>
      })
    }
  </Grid>
}

export default ColourIndex