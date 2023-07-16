import { Provider } from "react-redux"
import renderer from "react-test-renderer"
import "@testing-library/jest-dom"
import store from "../../redux/store"
import mockRouter from "next-router-mock"
import RecoverPassword from "."

jest.mock("next/router", () => require("next-router-mock"))

describe("Recover password component", () => {
  it("-- should match snapshot", () => {
    mockRouter.push({
      pathname: "/recover",
    })

    const tree = renderer
      .create(
        <Provider store={store}>
          <RecoverPassword />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(mockRouter).toMatchObject({
      pathname: "/recover",
    })
  })
})
