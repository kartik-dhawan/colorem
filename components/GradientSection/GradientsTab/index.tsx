import { Box } from "@mui/material"
import { API_URLS } from "../../../utils/constants"
import { styles } from "../styles"
import GradientBox from "./GradientBox"
import useSWR from "swr"
import { GradientDataType } from "../../../utils/interfaces"
import { fetcher } from "../../../utils/methods"

interface GradientsTabProps {
  gid: string
}

const GradientsTab = ({ gid }: GradientsTabProps) => {
  const { data } = useSWR<GradientDataType[]>(
    API_URLS ? API_URLS.GET_ALL_GRADIENTS : "",
    fetcher
  )

  const gradients = data?.reverse()

  return (
    <Box
      sx={styles.gradientSectionColorBoxWrapper}
      className={gid + "ColorBoxWrapper"}
      id={gid + "ColorBoxWrapper"}
    >
      {gradients?.map((gradient) => (
        <GradientBox grad={gradient} key={gradient.gradientGuid} />
      ))}
    </Box>
  )
}

export default GradientsTab
