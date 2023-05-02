import React from "react"
import renderer from "react-test-renderer"
import { ErrorBoundary } from "react-error-boundary"
import { Box } from "@mui/material"
import SubNav from "../../../components/common/Navbar/SubNav"
import Essentials from "../../../components/Essentials"
import FeedbackAndTeam from "../../../components/FeedbackAndTeam"
import FileSection from "../../../components/FileSection"
import ErrorFallback, {
  myErrorHandler,
} from "../../../components/common/ErrorFallback"
import { Provider } from "react-redux"
import store from "../../../redux/store"
import { contentfulDefaultData } from "../../../utils/MockData/dashboard"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import Feedback from "../../../components/FeedbackAndTeam/Feedback"
import TeamDetails from "../../../components/FeedbackAndTeam/TeamDetails"

describe("Dashboard page", () => {
  it("-- should match snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Box>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onError={myErrorHandler}
            >
              <SubNav content={contentfulDefaultData} />
              <FileSection />
              <FeedbackAndTeam />
              <Essentials />
            </ErrorBoundary>
          </Box>
        </Provider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("-- should render SubNav component correctly", () => {
    const view = render(
      <Provider store={store}>
        <SubNav content={contentfulDefaultData} />
      </Provider>
    )
    const subnav = view.getByTestId("subNavWrapper")
    expect(subnav).toBeInTheDocument()
  })

  it("-- should render FileSection component correctly", () => {
    const view = render(
      <Provider store={store}>
        <FileSection />
      </Provider>
    )
    const fileSection = view.getByTestId("fileSectionWrapper")
    expect(fileSection).toBeInTheDocument()
  })

  it("-- should render Feedback component correctly", () => {
    const view = render(
      <Provider store={store}>
        <Feedback />
      </Provider>
    )
    const feedbackSection = view.getByTestId("feedbackSectionWrapper")
    expect(feedbackSection).toBeInTheDocument()
  })

  it("-- should render TeamDetails component correctly", () => {
    const view = render(
      <Provider store={store}>
        <TeamDetails />
      </Provider>
    )
    const teamSection = view.getByTestId("teamSectionWrapper")
    expect(teamSection).toBeInTheDocument()
  })

  it("-- should render Essentials component correctly", () => {
    const view = render(
      <Provider store={store}>
        <Essentials />
      </Provider>
    )
    const essentialsSection = view.getByTestId("essentialsSectionWrapper")
    expect(essentialsSection).toBeInTheDocument()
  })
})
