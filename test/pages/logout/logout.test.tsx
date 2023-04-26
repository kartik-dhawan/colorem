import { Provider } from "react-redux"
import renderer from "react-test-renderer"
import "@testing-library/jest-dom"
import store from "../../../redux/store"
import { render } from "@testing-library/react"
import LogoutPage from "../../../pages/logout"

const logoutText = "Please wait while we log you out..."

jest.mock("next/router", () => require("next-router-mock"))

describe("Logout page", () => {
  it("-- should match snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <LogoutPage />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("-- should render logout text component correctly", () => {
    const view = render(
      <Provider store={store}>
        <LogoutPage />
      </Provider>
    )

    const logoutTextComponent = view.getByText(logoutText)
    expect(logoutTextComponent).toBeInTheDocument()
  })
})
