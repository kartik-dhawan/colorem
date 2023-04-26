import store from "../store"
import {
  ContentfulType,
  GradientDataType,
  PaletteDataType,
  AboutNavItem,
} from "../../utils/interfaces"
// Add the Type for all the states used in redux in this file.

// state types for store (no other types are required since they are included in 'configureStore')
export type RootType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export interface ContentType {
  data: ContentfulType
  aboutPageNavItems: AboutNavItem[]
  currentAboutContent: any /* eslint-disable-line */
}

export interface PalettesPagePropsType {
  palettesData: PaletteDataType[]
  contentData: ContentfulType
}

export interface PaletteType {
  data: PaletteDataType[]
}

export interface ToggleSliceType {
  copiedAlert: boolean
  selectedColor: string
  selectedColorsNumber: number | null
}

export interface GradientSliceType {
  gradient: GradientDataType
  data: GradientDataType[]
  isLoading: boolean
}

export interface AuthenticationState {
  isAuthenticated: boolean
}
