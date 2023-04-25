import { DocumentData, Query, getDocs } from "firebase/firestore"
import { USER_INITIAL_STATE } from "./constants"

export const getUsersDataFromQuery = async (query: Query<DocumentData>) => {
  const document = await getDocs(query)
  let user: DocumentData = USER_INITIAL_STATE
  document.forEach((doc) => {
    user = doc.data()
  })

  return user
}
