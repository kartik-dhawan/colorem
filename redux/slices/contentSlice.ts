import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ContentfulType } from "../../utils/interfaces"
import { ContentType } from "../constants/stateTypes"

// initial state
const initialState: any = {
  data: {},
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
  },
  extraReducers: {},
})

// typescript support is included inside createSlice
export const { updateContent } = contentSlice.actions

export default contentSlice.reducer
