const colToHex = (rgb) => { 
  if (!Number.isInteger(rgb)) return ''
  let hex = Number(rgb).toString(16)
  if (hex.length < 2) {
    hex = '0' + hex
  }
  return hex
}

const rgbToHex = (r,g,b) => {   
  const red = colToHex(r)
  const green = colToHex(g)
  const blue = colToHex(b)
  return (red + green + blue).toUpperCase()
}

export default rgbToHex