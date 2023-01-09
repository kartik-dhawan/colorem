export interface FinalPaletteType {
  paletteGuid: string
  name: string
  hex: string[]
  rgb: number[][]
  model: string
}

export type RandomColormindModelType = () => string
