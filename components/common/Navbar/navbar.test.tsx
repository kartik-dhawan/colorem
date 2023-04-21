import { Provider } from "react-redux"
import renderer from "react-test-renderer"
import "@testing-library/jest-dom"
import store from "../../../redux/store"
import SubNav from "./SubNav"
import { contentfulDefaultData } from "../../../utils/MockData/dashboard"
import Navbar from "./Navbar"

describe("Navbar & SubNav Component", () => {
  it("-- (Navbar) should match snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Navbar />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("-- (SubNav) should match snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <SubNav content={contentfulDefaultData} />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
