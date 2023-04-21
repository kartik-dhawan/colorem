import { Provider } from "react-redux"
import renderer from "react-test-renderer"
import "@testing-library/jest-dom"
import FileSection from "."
import store from "../../redux/store"
import { render } from "@testing-library/react"
import FileCard from "../common/FileCard"

describe("File section Component", () => {
  it("-- should match snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <FileSection />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("-- should render right file card correctly", () => {
    const view = render(
      <Provider store={store}>
        <FileCard type="right" fid="fileSection" fr={8} />
      </Provider>
    )
    const fileSectionRightCard = view.getByTestId("fileSectionright")
    expect(fileSectionRightCard).toBeInTheDocument()
  })

  it("-- should render left file card correctly", () => {
    const view = render(
      <Provider store={store}>
        <FileCard type="left" fid="fileSection" fr={4} />
      </Provider>
    )
    const fileSectionLeftCard = view.getByTestId("fileSectionleft")
    expect(fileSectionLeftCard).toBeInTheDocument()
  })
})
