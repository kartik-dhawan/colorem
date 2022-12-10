import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CountType } from "../constants/stateTypes"

// initial state
const initialState: CountType = {
  count: 0,
}

export const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    updateCount: (state: CountType) => {
      state.count += 1
    },
    // reducer involving payload (a parameter)
    updateCountBy: (state: CountType, action: PayloadAction<number>) => {
      state.count += action.payload
    },
  },
  extraReducers: {},
})

// typescript support is included inside createSlice
export const { updateCount, updateCountBy } = countSlice.actions

export default countSlice.reducer
