import { Box } from "@mui/material"
import { ErrorBoundary } from "react-error-boundary"
import { ChildrenType } from "../../../utils/interfaces"
import AboutPageNav from "../../AboutPageNav"
import ErrorFallback, { myErrorHandler } from "../ErrorFallback"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateAuthStatus } from "../../../redux/slices/authSlice"
import { isTokenValid } from "../../../utils/methods"

const AboutLayout = ({ children }: ChildrenType) => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    document.cookie = `page-route=${router.asPath}`
  }, [])

  const token: string =
    (typeof window !== "undefined" && localStorage.getItem("firebase-token")) ||
    ""

  /**
   * stores the auth status in store (false if token has expired)
   */
  const { isValid } = isTokenValid(token)

  useEffect(() => {
    dispatch(updateAuthStatus(isValid))
    // clears cookies & local storage then redirects user to login page once the session expires
    if (!isValid) {
      typeof window !== "undefined" && localStorage.removeItem("firebase-token") // eslint-disable-line
      document.cookie = "firebase-token='';"
    }
    // to make the token consistent
    if (token === "") {
      document.cookie = "firebase-token='';"
      router.asPath === "/admin" && router.replace("/login") // eslint-disable-line
    }
  }, [router.asPath, isValid, token])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      <Box
        sx={{
          display: "flex",
          minHeight: {
            lg: "720px",
            xl: "840px",
          },
          height: "max-content",
          maxHeight: "-webkit-fill-available",
          overflow: {
            lg: "hidden",
          },
          flexDirection: {
            xs: "column",
            lg: "row",
          },
        }}
      >
        <AboutPageNav />
        {children}
      </Box>
    </ErrorBoundary>
  )
}

export default AboutLayout
