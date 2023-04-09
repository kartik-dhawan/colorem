import { Grid } from "@mui/material"
import { styles } from "./styles"
import BrowseCard from "./BrowseCard"
import React from "react"
import PalettesPreviewCard from "./PalettesPreviewCard"

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
      sx={{
        marginBottom: "30px",
        display: "flex",
        flexDirection: "column",
      }}
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
        {type === "right" && <BrowseCard fid={fid} />}
        {type === "left" && <PalettesPreviewCard fid={fid} />}
      </Grid>
    </Grid>
  )
}

export default FileCard
