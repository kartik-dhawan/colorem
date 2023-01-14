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
  const { data, isLoading, error } = useSWR<GradientDataType[]>(
    API_URLS ? API_URLS.GET_ALL_GRADIENTS : "",
    fetcher
  )

  const [gradientsArray, setGradientsArray] = useState<GradientDataType[]>([])

  const { selectedColor } = useSelector((state: RootType) => state.toggleSlice)

  useEffect(() => {
    return data && setGradientsArray([...data].reverse())
  }, [data])

  // filters gradients on the basis of the color selected
  useEffect(() => {
    if (selectedColor !== "") {
      return (
        data &&
        setGradientsArray(
          data.filter((grad) => grad.filter.includes(selectedColor)).reverse()
        )
      )
    } else {
      return data && setGradientsArray(data.reverse())
    }
  }, [selectedColor])

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
      {gradientsArray && !error ? (
        <>
          <GradientFilter />
          <Box
            sx={styles.gradientSectionColorBoxWrapper}
            className={gid + "ColorBoxWrapper"}
            id={gid + "ColorBoxWrapper"}
          >
            {gradientsArray?.map((gradient) => (
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
