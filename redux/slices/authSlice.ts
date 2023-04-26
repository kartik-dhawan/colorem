import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AuthenticationState } from "../constants/stateTypes"

const initialState: AuthenticationState = {
  isAuthenticated: false,
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
  },
})

export const { updateAuthStatus } = authSlice.actions

export default authSlice.reducer
