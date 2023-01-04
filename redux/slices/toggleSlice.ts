import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ToggleSliceType } from "../constants/stateTypes"

const initialState: ToggleSliceType = {
  copiedAlert: false,
}

const toggleSlice = createSlice({
  name: "toggles",
  initialState,
  reducers: {
    toggleCopiedAlert: (
      state: ToggleSliceType,
      action: PayloadAction<boolean>
    ) => {
      state.copiedAlert = action.payload
    },
  },
})

export const { toggleCopiedAlert } = toggleSlice.actions

export default toggleSlice.reducer
