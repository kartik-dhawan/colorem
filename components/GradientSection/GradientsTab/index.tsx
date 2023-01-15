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

interface GradientsTabProps {
  gid: string
}

const GradientsTab = ({ gid }: GradientsTabProps) => {
  // final array of gradients which is further twisted as per the filter
  const [gradientsArray, setGradientsArray] = useState<GradientDataType[]>([])
  // const [filteredGradients, setFilteredGradients] = useState<GradientDataType[]>([])

  const [offset, setOffset] = useState<number>(0)

  const { data, isLoading, mutate } = useSWR<GradientDataType[]>(() => {
    if (offset <= 390) {
      return `${API_URLS.GET_ALL_GRADIENTS}?limit=30&offset=${offset}`
    }
  }, fetcher)

  const handleScroll = (e: any) => {
    const scrollHeight = e.target.documentElement.scrollHeight
    if (
      Math.floor(window.innerHeight + e.target.documentElement.scrollTop) ===
      Math.floor(scrollHeight)
    ) {
      setOffset((e) => e + 30)
      mutate()
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  }, [])

  // gets the filter value
  const { selectedColor, selectedColorsNumber } = useSelector(
    (state: RootType) => state.toggleSlice
  )

  // sets default data (all gradients) for the gradients page
  useEffect(() => {
    return data && setGradientsArray((oldData) => [...oldData, ...data])
  }, [data])

  // filters gradients on the basis of the color or colorsNumber selected
  useEffect(() => {
    console.log(gradientsArray)
    if (data) {
      return selectedColor !== ""
        ? setGradientsArray(
            gradientsArray.filter((grad) => grad.filter.includes(selectedColor))
          )
        : selectedColorsNumber !== null
        ? setGradientsArray(
            gradientsArray.filter(
              (grad) => grad.colors.length === selectedColorsNumber
            )
          )
        : setGradientsArray(gradientsArray)
    }
  }, [selectedColor, selectedColorsNumber])

  // useEffect(() => {
  //   console.log(offset)
  // }, [offset])

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
          <Box
            sx={styles.gradientSectionColorBoxWrapper}
            className={gid + "ColorBoxWrapper"}
            id={gid + "ColorBoxWrapper"}
          >
            {[...gradientsArray]?.map((gradient) => (
              <GradientBox grad={gradient} key={gradient.gradientGuid} />
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
