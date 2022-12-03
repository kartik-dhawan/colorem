import { Grid } from "@mui/material"
import Image from "next/image"
import { styles } from "../../common/styles"

interface FileCardType {
  type: string
  fid: string
  fr: number
}

const FileCard = ({ type, fid, fr }: FileCardType) => {
  return (
    <Grid md={fr} xs={12} item className={fid + "Card"} direction="column">
      {/* these two divs will always remain as first two children */}
      <Grid
        item
        className={fid + "CardUpper"}
        id={fid + "CardUpper"}
        sx={
          type === "right"
            ? styles.fileSectionCardUpperRight
            : styles.fileSectionCardUpperLeft
        }
      >
        <div />
      </Grid>
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
        {type === "right" ? (
          <div className={fid + "RightFileImage"}>
            <Image
              alt="bitmoji image"
              height={400}
              width={400}
              src="/image.png"
            />
          </div>
        ) : (
          ""
        )}
      </Grid>

      {/* content components/tags would be entered below */}
    </Grid>
  )
}

export default FileCard
