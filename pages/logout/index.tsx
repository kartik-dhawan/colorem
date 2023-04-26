import { getAuth, signOut } from "firebase/auth"
import { useEffect } from "react"
import { app } from "../../lib/auth/firebaseConfig"
import { useRouter } from "next/router"

const LogoutPage = () => {
  const auth = getAuth(app)
  const router = useRouter()

  useEffect(() => {
    signOut(auth)
      .then((sign) => {
        console.log(sign)
        localStorage.removeItem("firebase-token")
        document.cookie = "firebase-token='';"
        router.push("/login")
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <h3>Logging you out...</h3>
    </>
  )
}

export default LogoutPage
