export const getErrorObjectByCode = (errorCode: string) => {
  switch (errorCode) {
    case "auth/wrong-password":
      return {
        title: "Incorrect password",
        message:
          "The password you have entered is incorrect. Please try again.",
      }

    case "auth/too-many-requests":
      return {
        title: "Too many attempts",
        message:
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
      }

    case "auth/email-not-found":
      return {
        title: "Invalid username",
        message:
          "There is no account with this username. Please create a new account & login again.",
      }

    case "auth/account-rejected-credentials":
      return {
        title: "Incorrect credentials format",
        message: "The provided credentials are not allowed.",
      }

    case "auth/email-already-in-use":
      return {
        title: "Email already in use",
        message: "Please sign in or use a different email.",
      }

    case "auth/user-not-found":
      return {
        title: "User not found",
        message: "Please enter a valid email/username.",
      }

    case "auth/missing-email":
      return {
        title: "User not found",
        message: "Please enter a valid email/username.",
      }

    default:
      return {
        title: "Login error",
        message: "Something went wrong. Please try again.",
      }
  }
}
