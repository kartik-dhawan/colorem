import { Provider } from "react-redux"
import renderer from "react-test-renderer"
import "@testing-library/jest-dom"
import store from "../../../redux/store"
import Footer from "."

describe("Footer section Component", () => {
  it("-- should match snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Footer />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
