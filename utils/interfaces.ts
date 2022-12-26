export interface ContentfulType {
  [key: string]: any // eslint-disable-line
}

export interface PaletteDataType {
  hex: string[]
  model: string
  name: string
  paletteGuid: string
  rgb: number[][]
  __v: number
  _id: string
}

export type GetLightOrDarkTextColor = (hexcode: any) => "444" | "d9d9d9" | "fff" // eslint-disable-line

export type GetContrastingColor = (hexcode: any) => string // eslint-disable-line
