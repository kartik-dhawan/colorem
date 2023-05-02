import { DocumentData, Query, getDocs } from "firebase/firestore"

export const getUsersDataFromQuery = async (query: Query<DocumentData>) => {
  const document = await getDocs(query)
  let user: any = null // eslint-disable-line
  document.forEach((doc) => {
    user = doc.data()
  })

  return user
}
