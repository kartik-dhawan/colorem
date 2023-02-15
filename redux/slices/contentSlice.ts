import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AboutNavItem, ContentfulType } from "../../utils/interfaces"
import { ContentType } from "../constants/stateTypes"

// initial state
const initialState: ContentType = {
  data: {},
  aboutPageNavItems: [],
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
  },
})

// typescript support is included inside createSlice
export const { updateContent, updateAboutPageContent } = contentSlice.actions

export default contentSlice.reducer
