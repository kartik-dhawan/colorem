import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AuthenticationState } from "../constants/stateTypes"
import { LoginErrorSuccess } from "../../utils/interfaces"

const initialState: AuthenticationState = {
  isAuthenticated: false,
  errorSuccessState: {
    status: null,
    error: null,
  },
}

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    updateAuthStatus: (
      state: AuthenticationState,
      action: PayloadAction<boolean>
    ) => {
      state.isAuthenticated = action.payload
    },
    updateErrorSuccessState: (
      state: AuthenticationState,
      action: PayloadAction<LoginErrorSuccess>
    ) => {
      state.errorSuccessState = action.payload
    },
    resetErrorState: (state: AuthenticationState) => {
      state.errorSuccessState = initialState.errorSuccessState
      state.isAuthenticated = false
    },
  },
})

export const { updateAuthStatus, updateErrorSuccessState, resetErrorState } =
  authSlice.actions

export default authSlice.reducer
