import { GetContrastingColor, GetLightOrDarkTextColor } from "./interfaces"

// lightens or darkens a color by a certain amount
export const LightenDarkenColor = (col: string, amt: number) => {
  let usePound = false

  if (col[0] == "#") {
    col = col.slice(1)
    usePound = true
  }

  const num = parseInt(col, 16)

  let r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00ff) + amt

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000ff) + amt

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
}

// finds out if a color is light or dark
export const lightOrDark = (color: any) => {
  // eslint-disable-line
  // letiables for red, green, blue values
  let r, g, b

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate letiables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    )

    r = color[1]
    g = color[2]
    b = color[3]
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"))

    r = color >> 16
    g = (color >> 8) & 255
    b = color & 255
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return "light"
  } else {
    return "dark"
  }
}

// gets a contrasting color by 50% for any color
export const getContrastingColor: GetContrastingColor = (hexcode: any) => {
  // eslint-disable-line
  if (lightOrDark(hexcode) === "light") {
    return LightenDarkenColor(hexcode, -50)
  } else if (lightOrDark(hexcode) === "dark") {
    return LightenDarkenColor(hexcode, 50)
  } else {
    return "#fff"
  }
}

// returns #444 or #d9d9d9 color for text on the basis of lighter or darker background
export const getLightOrDarkTextColor: GetLightOrDarkTextColor = (
  hexcode: any // eslint-disable-line
) => {
  if (lightOrDark(hexcode) === "light") {
    return "444"
  } else if (lightOrDark(hexcode) === "dark") {
    return "d9d9d9"
  } else {
    return "fff"
  }
}

// copy to clipboard function
export const copyToClipboard = (data: string) => {
  navigator.clipboard.writeText(data)
}

export const copyHexCode = (hexcode: string) => {
  copyToClipboard(`#${hexcode}`)
}

export const copyPaletteJSON = (palette: any) => {
  copyToClipboard(JSON.stringify(palette))
}
