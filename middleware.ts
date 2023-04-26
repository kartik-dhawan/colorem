import { NextRequest, NextResponse } from "next/server"
import { parseCookie } from "./utils/methods"
import jwt from "jsonwebtoken"

export const middleware = async (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers)
  const authHeader = requestHeaders.get("cookie")
  const parsedCookie = authHeader && parseCookie(authHeader)
  const token = parsedCookie && parsedCookie["firebase-token"]
  const previousRoute =
    parsedCookie && parsedCookie["page-route"]
      ? parsedCookie["page-route"]
      : "/dashboard"

  const validDecoded = token && jwt.decode(token)

  if (
    request.nextUrl.pathname === "/login" &&
    validDecoded !== null &&
    validDecoded !== undefined
  ) {
    /**
     * if we're logged in, remove acces from '/login' page
     */
    return NextResponse.redirect(new URL(previousRoute, request.url))
  } else if (
    request.nextUrl.pathname === "/logout" &&
    validDecoded === null &&
    validDecoded === undefined
  ) {
    /**
     * if we're logged out, remove acces from '/logout' page
     */
    return NextResponse.redirect(new URL(previousRoute, request.url))
  } else if (request.nextUrl.pathname !== "/login") {
    if (validDecoded !== null && validDecoded !== undefined) {
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
  matcher: ["/login", "/logout", "/admin", "/gradients/create"],
  unstable_allowDynamic: [
    // FIX
    "**/node_modules/lodash/lodash.js", // use a glob to allow anything in the function-bind 3rd party module
  ],
}
