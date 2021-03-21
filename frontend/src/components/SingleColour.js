import React from 'react'
import CommonColour from './CommonColour'


const SingleColour = (props) => (
  <CommonColour colourID={props.match.params.id} disableInput={true} />
)


export default SingleColour