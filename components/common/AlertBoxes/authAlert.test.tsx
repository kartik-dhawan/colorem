import { Provider } from "react-redux"
import renderer from "react-test-renderer"
import "@testing-library/jest-dom"
import AuthAlert from "./AuthAlert"
import store from "../../../redux/store"
import { LoginErrorSuccess } from "../../../utils/interfaces"

const authError: LoginErrorSuccess = {
  status: "error",
  error: {
    code: "auth/wrong-password",
    name: "wrong password",
    message: "Firebase: Error (auth/wrong-password).",
    customData: {},
  },
}

describe("Auth Alert component", () => {
  it("-- should match snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AuthAlert state={authError} />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
