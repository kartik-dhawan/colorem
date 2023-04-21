import Home from "../../pages"
import { Provider } from "react-redux"
import store from "../../redux/store"
import { contentfulDefaultData } from "../../utils/MockData/dashboard"
import renderer from "react-test-renderer"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("Home page", () => {
  it("-- should match snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Home contentData={contentfulDefaultData} />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("-- should render", () => {
    const view = render(
      <Provider store={store}>
        <Home contentData={contentfulDefaultData} />
      </Provider>
    )

    const homeTitle = view.getByText("Colorem")

    expect(homeTitle).toBeInTheDocument()
  })
})
