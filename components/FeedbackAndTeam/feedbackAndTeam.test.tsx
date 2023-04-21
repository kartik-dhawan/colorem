import { Provider } from "react-redux"
import renderer from "react-test-renderer"
import "@testing-library/jest-dom"
import store from "../../redux/store"
import { render } from "@testing-library/react"
import FeedbackAndTeam from "."
import Feedback from "./Feedback"
import TeamDetails from "./TeamDetails"

describe("Feedback and team section Component", () => {
  it("-- should match snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <FeedbackAndTeam />
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("-- should render feedback component correctly", () => {
    const view = render(
      <Provider store={store}>
        <Feedback />
      </Provider>
    )
    const feedbackSection = view.getByTestId("feedbackSectionWrapper")
    expect(feedbackSection).toBeInTheDocument()
  })

  it("-- should render team details component correctly", () => {
    const view = render(
      <Provider store={store}>
        <TeamDetails />
      </Provider>
    )
    const teamSection = view.getByTestId("teamSectionWrapper")
    expect(teamSection).toBeInTheDocument()
  })
})
