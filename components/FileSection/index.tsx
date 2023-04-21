import { Grid } from "@mui/material"
import FileCard from "../common/FileCard"

const FileSection = () => {
  const fid = "fileSection"

  return (
    <Grid
      container
      className={fid + "Wrapper"}
      direction="row"
      data-testid={fid + "Wrapper"}
    >
      <FileCard type="right" fid={fid} fr={8} />
      <FileCard type="left" fid={fid} fr={4} />
    </Grid>
  )
}

export default FileSection
