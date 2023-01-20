import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GradientDataType } from "../../utils/interfaces"
import { GradientSliceType } from "../constants/stateTypes"

const initialState: GradientSliceType = {
  gradient: {
    gradientGuid: "",
    colors: [""],
    filter: [""],
    __v: 0,
    _id: "",
    name: "",
    likes: 0,
  },
  data: [],
  isLoading: true,
}

const gradientSlice = createSlice({
  name: "gradient slice",
  initialState,
  reducers: {
    updateCurrentGradient: (
      state: GradientSliceType,
      action: PayloadAction<GradientDataType>
    ) => {
      state.gradient = action.payload
    },
    updateGradientsData: (
      state: GradientSliceType,
      action: PayloadAction<GradientDataType[]>
    ) => {
      state.data = action.payload
    },
    updateLoadingStatus: (
      state: GradientSliceType,
      action: PayloadAction<boolean>
    ) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  updateCurrentGradient,
  updateGradientsData,
  updateLoadingStatus,
} = gradientSlice.actions
export default gradientSlice.reducer
