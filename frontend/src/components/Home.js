import React from 'react'
import Grid from '@material-ui/core/Grid'

import '../styles/components/Home.scss'

import ColourImage from '../images/colour-1885352.jpg'

const Home = () => (
  <Grid 
    container 
    id="home" 
    direction="row"
    justify="flex-start"
    alignItems="center"
    style={{ backgroundImage: `url(${ColourImage})` }}
  >
    <Grid item>
      <h1 className="title rainbow-text">Chroma</h1>
    </Grid>
  </Grid>
)

export default Home