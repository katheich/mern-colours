import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'


import '../styles/components/Home.scss'


const Home = () => (
  <Grid 
    container 
    id="home" 
    direction="row"
    justify="flex-start"
    alignItems="center"
  >
    <Grid item>
      <h1 className="rainbow-text">Chroma</h1>
    </Grid>
  </Grid>
  

)

export default Home