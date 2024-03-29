import axios from "axios"
import { gradientBoxTypes } from "./constants"
import {
  GetContrastingColor,
  GetLightOrDarkTextColor,
  TokenExpirationDetails,
} from "./interfaces"
import jwt from "jsonwebtoken"

/**
 * lightens or darkens a color by a certain amount
 * @param {string} col
 * @param {number} amt
 * @returns
 */
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

/**
 * finds out if a color is light or dark
 * @param {any} color
 * @returns
 */
export const lightOrDark = (color: any) /* eslint-disable-line */ => {
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

/**
 * gets a contrasting color by 50% for any color
 * @param {string | number | any} hexcode
 * @returns
 */
export const getContrastingColor: GetContrastingColor = (
  hexcode: any /* eslint-disable-line */
) => {
  if (lightOrDark(hexcode) === "light") {
    return LightenDarkenColor(hexcode, -50)
  } else if (lightOrDark(hexcode) === "dark") {
    return LightenDarkenColor(hexcode, 50)
  } else {
    return "#fff"
  }
}

/**
 * returns #444 or #d9d9d9 color for text on the basis of lighter or darker background
 * @param {string | number | any} hexcode
 * @returns
 */
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

// copy to clipboard functions
/**
 * @param {string} data
 */
export const copyToClipboard = (data: string) => {
  navigator.clipboard.writeText(data)
}

/**
 * @param {string} hexcode
 */
export const copyHexCode = (hexcode: string) => {
  copyToClipboard(`#${hexcode}`)
}

/**
 * @param {any} palette
 */
export const copyPaletteJSON = (palette: any) /* eslint-disable-line */ => {
  copyToClipboard(JSON.stringify(palette))
}

/**
 * returns a random box-size for gradients page
 * @returns {string}
 */
export const getRandomBox: () => string = () => {
  return gradientBoxTypes[Math.floor(Math.random() * 4)]
}

/**
 * fetcher (POST) for useSWR API call
 * @param {string} url
 */
export const fetcher = (url: string) => axios.post(url).then((res) => res.data)

/**
 * converts hex to rgb
 * @param {string} hex
 */

export const hexToRGB = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const rgb =
    result &&
    `(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
      result[3],
      16
    )})`
  return rgb
}

/**
 * returns a sorted array of objects on the basis of a key in the object
 * @param {any[]} arr
 * @param {string} field
 * @returns
 */
export const sortArrayByField = (
  arr: any[] /* eslint-disable-line */,
  key: string
) => {
  const sortedArray =
    arr &&
    [...arr].sort((a: any, b: any) /* eslint-disable-line */ =>
      a[key] > b[key] ? 1 : -1)
  return sortedArray
}

/**
 * converts months to 'years & months' format
 * returns '< year' if months < 12
 * @param {number} months
 * @returns
 */
export const monthsToYears = (months: number) => {
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (years === 0) {
    return "< year"
  }
  return `${years}y ${remainingMonths}m`
}
/**
 *
 * @param {any[]} arr
 * @param {number} requiredLength // optional
 * @returns
 */
export const getShuffledArray = (
  arr: any[] /* eslint-disable-line */,
  requiredLength?: number
) => {
  const array = [...arr]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // random index from 0 to
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  if (requiredLength) {
    return array.slice(0, requiredLength)
  }
  return array
}

/**
 * @param {string} str
 */
export const parseCookie = (str: string) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce(
      (acc: any, v) /* eslint-disable-line */ => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
        return acc
      },
      {}
    )

/**
 *
 * @param {string} token
 * @returns
 * isValid: true -> not expired
 * isValid: false -> expired
 */
export const isTokenValid = (token: any) /* eslint-disable-line */ => {
  const decoded = token && jwt.decode(token)
  const expiration = decoded?.exp * 1000
  const expTime = Math.floor((expiration - Date.now()) / 1000)

  /**
   * if token is invalid in format or we pass the wrong token
   * the expiration would not be a number and hence we return isValid: false in that case
   */
  const tokenExpirationDetails: TokenExpirationDetails = {
    isValid: Number.isNaN(expiration) ? false : !(Date.now() >= expiration),
    now: Date.now(),
    exp: expiration,
    expTimeInSeconds: expTime >= 0 ? expTime : 0,
  }

  return tokenExpirationDetails
}

/**
 *
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email)
}
