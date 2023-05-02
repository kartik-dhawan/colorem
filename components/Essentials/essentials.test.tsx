import { Provider } from "react-redux"
import renderer from "react-test-renderer"
import "@testing-library/jest-dom"
import store from "../../redux/store"
import { render } from "@testing-library/react"
import Essentials from "."

describe("The Essentials section Component", () => {
  it("-- should match snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Essentials />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("-- should render essentials section bullet points correctly", () => {
    const view = render(
      <Provider store={store}>
        <Essentials />
      </Provider>
    )
    const essentialsSectionBulletPoints = view.getByTestId(
      "essentialsSectionBody"
    )
    expect(essentialsSectionBulletPoints).toBeInTheDocument()
  })
})
