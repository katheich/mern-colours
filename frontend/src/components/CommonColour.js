import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Slider from '@material-ui/core/Slider'
import Input from '@material-ui/core/Input'

import rgbToHex from '../lib/rgbToHex'

import '../styles/components/CommonColour.scss'

const CommonColour = ({ colourID, disableInput }) => {
  
  const [data, setData] = useState({})
  const [redValue, setRedValue] = React.useState(0)
  const [greenValue, setGreenValue] = React.useState(0)
  const [blueValue, setBlueValue] = React.useState(0)
  const [hexValue, setHexValue] = React.useState('')

  useEffect(() => {
    axios.get(`/api/colours/${colourID}`)
      .then(resp => handleData(resp.data))
      .catch(err => console.log(err))
  }, [])


  const handleData = (data) => {
    setData(data)
    setRedValue(data.rgb[0])
    setGreenValue(data.rgb[1])
    setBlueValue(data.rgb[2])
    setHexValue(data.hex)
  }

  const setColourValues = (colour, value) => {
    if (colour === 'red') {
      setRedValue(value)
    }
    if (colour === 'green') {
      setGreenValue(value)
    }
    if (colour === 'blue') {
      setBlueValue(value)
    }
  }

  useEffect(() => {
    setHexValue(rgbToHex(redValue, greenValue, blueValue))
  }, [redValue, greenValue, blueValue])

  const handleSliderChange = (event, newValue) => {
    setColourValues(event.target.dataset.name, newValue)
  }

  const handleInputChange = (event) => {
    const value = Number(event.target.value)
    const colour = event.target.name
    if (value < 0 || !value) {
      setColourValues(colour, 0)
    } else if (value > 255) {
      setColourValues(colour, 255)
    } else {
      setColourValues(colour, value)
    }
  }

  if (!data || !data.user ) return <div>Loading...</div>
  else return  <Grid 
    container 
    id="colour-container" 
    direction="row"
    justify="center"
    alignItems="center"
    style={{ backgroundColor: `#${hexValue}` }}
  >
    <Grid item>
      <Paper className="colour-description" elevation={1}>
        <Grid container>
          <Grid item id="description">
            <h2>{data.name}</h2>
            <p>Hex: {hexValue && hexValue}</p>

            
            <small>Created by: {data.user && data.user.username}</small>
          </Grid>
          <Grid item id="sliders">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  disabled={disableInput}
                  value={typeof redValue === 'number' ? redValue : 0}
                  data-name="red"
                  onChange={handleSliderChange}
                  min={0}
                  max={255}
                  valueLabelDisplay="auto"
                  className="slider red"
                />
              </Grid>
              <Grid item>
                <Input
                  value={redValue}
                  disabled={disableInput}
                  name="red"
                  margin="dense"
                  onChange={handleInputChange}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 255,
                    type: 'number'
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={typeof greenValue === 'number' ? greenValue : 0}
                  disabled={disableInput}
                  data-name="green"
                  onChange={handleSliderChange}
                  min={0}
                  max={255}
                  valueLabelDisplay="auto"
                  className="slider green"
                />
              </Grid>
              <Grid item>
                <Input
                  value={greenValue}
                  disabled={disableInput}
                  name="green"
                  margin="dense"
                  onChange={handleInputChange}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 255,
                    type: 'number'
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={typeof blueValue === 'number' ? blueValue : 0}
                  disabled={disableInput}
                  data-name="blue"
                  onChange={handleSliderChange}
                  min={0}
                  max={255}
                  valueLabelDisplay="auto"
                  className="slider blue"
                />
              </Grid>
              <Grid item>
                <Input
                  value={blueValue}
                  disabled={disableInput}
                  name="blue"
                  margin="dense"
                  onChange={handleInputChange}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 255,
                    type: 'number'
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      
    </Grid>
  </Grid>

}


export default CommonColour