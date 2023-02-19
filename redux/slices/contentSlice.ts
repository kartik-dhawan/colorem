import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AboutNavItem, ContentfulType } from "../../utils/interfaces"
import { ContentType } from "../constants/stateTypes"

// initial state
const initialState: ContentType = {
  data: {},
  aboutPageNavItems: [],
  currentAboutContent: {},
}

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    // reducer involving payload (a parameter)
    updateContent: (
      state: ContentType,
      action: PayloadAction<ContentfulType>
    ) => {
      state.data = action.payload
    },
    updateAboutPageContent: (
      state: ContentType,
      action: PayloadAction<AboutNavItem[]>
    ) => {
      state.aboutPageNavItems = action.payload
    },
    updateCurrentAboutPageContent: (
      state: ContentType,
      action: PayloadAction<AboutNavItem>
    ) => {
      state.currentAboutContent = action.payload
    },
  },
})

// typescript support is included inside createSlice
export const {
  updateContent,
  updateAboutPageContent,
  updateCurrentAboutPageContent,
} = contentSlice.actions

export default contentSlice.reducer
