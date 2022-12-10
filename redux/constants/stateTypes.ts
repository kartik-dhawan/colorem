import store from "../store"
// Add the Type for all the states used in redux in this file.

// state types for store (no other types are required since they are included in 'configureStore')
export type RootType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export interface CountType {
  count: number
}
