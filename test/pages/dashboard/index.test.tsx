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

describe("Dashboard page", () => {
  it("should render", () => {
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
})
