export interface ContentfulType {
  [key: string]: any // eslint-disable-line
}

export interface EssentialItemsType {
  id: number
  body: string
}

export interface ChildrenType {
  children: JSX.Element
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

export interface GradientDataType {
  gradientGuid: string
  colors: string[]
  filter: string[]
  __v: number
  _id: string
  name: string
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

export interface BoxTypeStylesType {
  [key: string]: {
    gridColumn?: {
      [key: string]: string
    }
    gridRow?: {
      [key: string]: string
    }
  }
}

export interface ColorListType {
  cid: number
  colorType: string
  colorCode: string
}

export interface InstructorObject {
  icon?: string
  instruction: string
  id: number
}

export interface AboutNavItem {
  id: number
  title: string
  route: string
}
