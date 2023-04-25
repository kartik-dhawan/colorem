import { NextRequest, NextResponse } from "next/server"
import { parseCookie } from "./utils/methods"
import jwt from "jsonwebtoken"

export const middleware = async (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers)
  const authHeader = requestHeaders.get("cookie")
  const parsedCookie = authHeader && parseCookie(authHeader)
  const token = parsedCookie && parsedCookie["firebase-token"]
  const previousRoute = parsedCookie["page-route"] || "/dashboard"

  const validDecoded = token && jwt.decode(token)

  /**
   * if we're logged in, remove acces from '/login' page
   */
  if (request.nextUrl.pathname === "/login" && validDecoded !== null) {
    return NextResponse.redirect(new URL(previousRoute, request.url))
  } else if (request.nextUrl.pathname !== "/login") {
    if (validDecoded !== null) {
      /**
       * If the token is valid
       * the user is authenticated
       * the user to directed to their desired page
       */

      NextResponse.next()
    } else {
      /**
       * if the token is invalid
       * the user is not authenticated
       * the request is not being handled by the server & the user is prompted to login
       */
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }
}

// simply add routes to protect in this config
export const config = {
  matcher: ["/login", "/admin", "/gradients/create"],
}
