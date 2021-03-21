import React from 'react'
import CommonColour from './CommonColour'


const EditColour = (props) => (
  <CommonColour colourID={props.match.params.id} disableInput={false} />
)


export default EditColour