import React from 'react'
import CommonColour from './CommonColour'


const NewColour = (props) => (
  <CommonColour colourID={props.match.params.id} disableInput={false} />
)


export default NewColour