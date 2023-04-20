import { Box } from "@mui/material"
import { styles } from "../styles"
import GradientBox from "./GradientBox"
import { GradientDataType } from "../../../utils/interfaces"
import PrimaryLoader from "../../common/Loaders/PrimaryLoader"
import GradientFilter from "./GradientFilter"
import { useDispatch, useSelector } from "react-redux"
import { RootType } from "../../../redux/constants/stateTypes"
import { useEffect, useState } from "react"
import InfoDrawer from "./InfoDrawer"
import Instructor from "../../common/Instructor"
import { useRouter } from "next/router"
import { updateCurrentGradient } from "../../../redux/slices/gradientSlice"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback, { myErrorHandler } from "../../common/ErrorFallback"

interface GradientsTabProps {
  gid: string
}

const GradientsTab = ({ gid }: GradientsTabProps) => {
  const pageName = "gradientsPage"
  const router = useRouter()
  const dispatch = useDispatch()
  const { guid } = router.query

  const [showInstructor, setShowInstructor] = useState<boolean>(false)

  /**
   * If there is no guid present in the query params, it will remove useless 'guid=' text from url
   */
  useEffect(() => {
    if (guid === "") {
      router.push("/gradients")
    }
  }, [guid])

  /**
   * gets the contentful data
   */
  const { gradientSectionInstructor } = useSelector(
    (state: RootType) => state.contentSlice.data
  )

  const { data } = useSelector((state: RootType) => state.gradientSlice)

  /*
   * final array of gradients which is further twisted as per the filter
   */
  const [gradientsArray, setGradientsArray] = useState<GradientDataType[]>([])

  /**
   * If there is a guid in the query params, it will validate that guid
   * check if there's a gradient object for that guid
   * if yes, it will update the current gradient in store & toggle the info drawer with that data populated
   */
  useEffect(() => {
    if (guid) {
      const gradFromURL = gradientsArray.filter(
        (item) => item.gradientGuid === guid
      )

      if (gradFromURL.length !== 0) {
        dispatch(updateCurrentGradient(gradFromURL[0]))
        setInfoDrawerToggle(true)
      }
    }
  }, [guid, gradientsArray])

  // gets the filter value
  const { selectedColor, selectedColorsNumber } = useSelector(
    (state: RootType) => state.toggleSlice
  )

  /*
   * sets default data (all gradients) for the gradients page
   */
  useEffect(() => {
    return data && setGradientsArray([...data])
  }, [data])

  /*
   * filters gradients on the basis of the color or colorsNumber selected
   */
  useEffect(() => {
    if (data) {
      return selectedColor !== ""
        ? setGradientsArray(
            data.filter((grad) => grad.filter.includes(selectedColor))
          )
        : selectedColorsNumber !== null
        ? setGradientsArray(
            data.filter((grad) => grad.colors.length === selectedColorsNumber)
          )
        : setGradientsArray(data)
    }
  }, [selectedColor, selectedColorsNumber, data])

  /*
   * Toggle state for gradient info drawer
   */
  const [infoDrawerToggle, setInfoDrawerToggle] = useState<boolean>(false)

  useEffect(() => {
    const isFirstTimePopup =
      localStorage.getItem(`${pageName}Instructor`) === "visited" ? false : true
    setShowInstructor(isFirstTimePopup)
  }, [])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      {showInstructor ? (
        <Box sx={{ fontWeight: 300, letterSpacing: "0.3px" }}>
          <Instructor
            instructorData={gradientSectionInstructor}
            setShowInstructor={setShowInstructor}
            page={pageName}
          />
        </Box>
      ) : gradientsArray.length === 0 ? (
        <Box
          sx={styles.gradientSectionLoaderWrapper}
          className={gid + "LoaderWrapper"}
          id={gid + "LoaderWrapper"}
        >
          <PrimaryLoader />
        </Box>
      ) : (
        <>
          <GradientFilter />
          <InfoDrawer
            infoDrawerToggle={infoDrawerToggle}
            setInfoDrawerToggle={setInfoDrawerToggle}
          />
          <Box
            sx={styles.gradientSectionColorBoxWrapper}
            className={gid + "ColorBoxWrapper"}
            id={gid + "ColorBoxWrapper"}
          >
            {[...gradientsArray]?.reverse().map((gradient) => (
              <GradientBox
                grad={gradient}
                key={gradient.gradientGuid}
                infoDrawerToggle={infoDrawerToggle}
                setInfoDrawerToggle={setInfoDrawerToggle}
              />
            ))}
          </Box>
        </>
      )}
    </ErrorBoundary>
  )
}

export default GradientsTab
