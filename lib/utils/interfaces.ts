export interface FinalPaletteType {
  paletteGuid: string
  name: string
  hex: string[]
  rgb: number[][]
  model: string
  likes?: number
}

export type RandomColormindModelType = () => string

export interface GradientBody {
  name: string
  colors: string[]
  filter: string[]
}

export interface FinalGradientType {
  gradientGuid: string
  name: string
  colors: string[]
  filter: string[]
  likes: number
}
