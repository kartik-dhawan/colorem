import { Box } from "@mui/material"
import { API_URLS } from "../../../utils/constants"
import { styles } from "../styles"
import GradientBox from "./GradientBox"
import useSWR from "swr"
import { GradientDataType } from "../../../utils/interfaces"
import { fetcher } from "../../../utils/methods"
import PrimaryLoader from "../../common/Loaders/PrimaryLoader"
import GradientFilter from "./GradientFilter"
import { useSelector } from "react-redux"
import { RootType } from "../../../redux/constants/stateTypes"
import { useEffect, useState } from "react"
import InfoDrawer from "./InfoDrawer"

interface GradientsTabProps {
  gid: string
}

const GradientsTab = ({ gid }: GradientsTabProps) => {
  const { data, isLoading } = useSWR<GradientDataType[]>(
    API_URLS ? API_URLS.GET_ALL_GRADIENTS : "",
    fetcher
  )

  /*
   * final array of gradients which is further twisted as per the filter
   */
  const [gradientsArray, setGradientsArray] = useState<GradientDataType[]>([])

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
  }, [selectedColor, selectedColorsNumber])

  /*
   * Toggle state for gradient info drawer
   */
  const [infoDrawerToggle, setInfoDrawerToggle] = useState<boolean>(false)

  return (
    <>
      {isLoading && (
        <Box
          sx={styles.gradientSectionLoaderWrapper}
          className={gid + "LoaderWrapper"}
          id={gid + "LoaderWrapper"}
        >
          <PrimaryLoader />
        </Box>
      )}
      {gradientsArray ? (
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
      ) : (
        /* Design a proper error component for API fail */
        <pre>Error running the api please try again</pre>
      )}
    </>
  )
}

export default GradientsTab
