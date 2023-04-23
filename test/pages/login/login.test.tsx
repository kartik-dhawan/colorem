import { Provider } from "react-redux"
import renderer from "react-test-renderer"
import "@testing-library/jest-dom"
import mockRouter from "next-router-mock"
import Login from "../../../pages/login"
import store from "../../../redux/store"
import LoginPage from "../../../components/LoginPage"
import { render } from "@testing-library/react"

jest.mock("next/router", () => require("next-router-mock"))

describe("Login page", () => {
  it("-- should match snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Login />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("-- should render form component correctly", () => {
    const view = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    )

    const loginForm = view.getByTestId("loginPageFormWrapper")
    expect(loginForm).toBeInTheDocument()
  })

  it("-- should render login button correctly", () => {
    mockRouter.push({
      pathname: "/login",
      query: { ...mockRouter.query, activity: "login" },
    })

    const view = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    )

    expect(mockRouter).toMatchObject({
      query: {
        activity: "login",
      },
    })

    const loginButton = view.queryByTestId("loginPageLoginButton")
    expect(loginButton).toBeInTheDocument()
    const signupButton = view.queryByTestId("loginPageSignupButton")
    expect(signupButton).not.toBeInTheDocument()

    const loginToggle = view.queryByTestId("loginPageToggleLogin")
    expect(loginToggle).not.toBeInTheDocument()
    const signupToggle = view.queryByTestId("loginPageToggleSignup")
    expect(signupToggle).toBeInTheDocument()
  })

  it("-- should render signup button correctly", () => {
    mockRouter.push({
      pathname: "/login",
      query: { ...mockRouter.query, activity: "signup" },
    })

    const view = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    )

    expect(mockRouter).toMatchObject({
      query: {
        activity: "signup",
      },
    })

    const signupButton = view.queryByTestId("loginPageSignupButton")
    expect(signupButton).toBeInTheDocument()
    const loginButton = view.queryByTestId("loginPageLoginButton")
    expect(loginButton).not.toBeInTheDocument()

    const loginToggle = view.queryByTestId("loginPageToggleLogin")
    expect(loginToggle).toBeInTheDocument()
    const signupToggle = view.queryByTestId("loginPageToggleSignup")
    expect(signupToggle).not.toBeInTheDocument()
  })
})
