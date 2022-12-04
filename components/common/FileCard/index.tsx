import { Grid } from "@mui/material"
import { styles } from "../../common/styles"
import BrowseCard from "./BrowseCard"

interface FileCardType {
  type: string
  fid: string
  fr: number
}

const FileCard = ({ type, fid, fr }: FileCardType) => {
  return (
    <Grid
      item
      md={fr}
      xs={12}
      className={fid + "Card"}
      direction="column"
      marginBottom={"30px"}
    >
      <Grid
        item
        className={fid + "CardLower"}
        id={fid + "CardLower"}
        sx={
          type === "right"
            ? styles.fileSectionCardLowerRight
            : styles.fileSectionCardLowerLeft
        }
      >
        {/* conditionally rendered card content */}
        {type === "right" ? <BrowseCard fid={fid} /> : ""}
      </Grid>
    </Grid>
  )
}

export default FileCard
