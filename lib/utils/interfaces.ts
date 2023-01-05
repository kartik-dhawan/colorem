export interface FinalPaletteType {
  paletteGuid: string
  name: string
  hex: string[]
  rgb: number[][]
  model: string
  likes?: number
}

export type RandomColormindModelType = () => string
