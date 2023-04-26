import { ReactNode } from "react"

export interface ContentfulType {
  [key: string]: any // eslint-disable-line
}

export interface DashboardPage extends ContentfulType {
  palettes: PaletteDataType[]
}

export interface PalettesPage extends ContentfulType {
  palettes: PaletteDataType[]
}

export interface GradientsPage extends ContentfulType {
  palettes: GradientDataType[]
}

export interface EssentialItemsType {
  id: number
  body: string
}

export interface ChildrenType {
  children: ReactNode
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
  content?: any /* eslint-disable-line */
}

export interface AnimationVariant {
  before: {
    [key: string]: string | number
  }
  after: {
    [key: string]: string | number
  }
}

export interface RoleButtonData {
  role: string
  label: string
}

export interface SkillType {
  order: number
  techName: string
  techLabel: string
  fluency: number
  adaptability: number
  professionalExperience: number
  handsOnExperience: number
  projects: number
}

export interface LoginFormState {
  email: string
  password: string
  username: string
}

export interface TokenExpirationDetails {
  isValid: boolean
  now: number
  exp: number
  expTimeInSeconds: number
}
