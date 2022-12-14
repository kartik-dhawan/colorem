export interface ContentfulType {
  [key: string]: any // eslint-disable-line
}

export interface EssentialItemsType {
  id: number
  body: string
}

export interface SideNavItemsType {
  body: string
  id: number
  link: string
  title: string
}

export interface FooterContentObject {
  source: string
  sourceName: string
  title: string
  type: string
}

export interface PaletteDataType {
  hex: string[]
  model: string
  name: string
  paletteGuid: string
  rgb: number[][]
  __v: number
  _id: string
  likes: number
}

export type JSONForPaletteFunction = (
  allPalettes: PaletteDataType[], // eslint-disable-line
  count: number // eslint-disable-line
) => PaletteJSONType

export type GetLightOrDarkTextColor = (hexcode: any) => "444" | "d9d9d9" | "fff" // eslint-disable-line

export type GetContrastingColor = (hexcode: any) => string // eslint-disable-line

export type CountHandlerType = () => void

export interface PaletteColorJSONType {
  TITLE: string
  BACKGROUND: string
  TEXT: string
}

export interface PaletteJSONType {
  name?: string
  palette?: PaletteColorJSONType[]
}
