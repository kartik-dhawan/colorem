import { Provider } from "react-redux"
import renderer from "react-test-renderer"
import "@testing-library/jest-dom"
import store from "../../redux/store"
import LoginPage from "."
import mockRouter from "next-router-mock"

jest.mock("next/router", () => require("next-router-mock"))

describe("Login page", () => {
  it("-- (login) should match snapshot", () => {
    mockRouter.push({
      pathname: "/login",
      query: { ...mockRouter.query, activity: "login" },
    })

    const tree = renderer
      .create(
        <Provider store={store}>
          <LoginPage />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(mockRouter).toMatchObject({
      query: {
        activity: "login",
      },
    })
  })

  it("-- (signup) should match snapshot", () => {
    mockRouter.push({
      pathname: "/signup",
      query: { ...mockRouter.query, activity: "signup" },
    })

    const tree = renderer
      .create(
        <Provider store={store}>
          <LoginPage />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(mockRouter).toMatchObject({
      query: {
        activity: "signup",
      },
    })
  })
})
