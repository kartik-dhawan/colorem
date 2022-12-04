import { Typography } from "@mui/material"
import EastIcon from "@mui/icons-material/East"
import GrainIcon from "@mui/icons-material/Grain"
import Image from "next/image"

interface BrowseType {
  fid: string
}

const BrowseCard = ({ fid }: BrowseType) => {
  return (
    <div className={fid + "RightFileContent"}>
      <div className={fid + "Content"}>
        <GrainIcon className={fid + "GrainIcon"} />
        <Typography variant="h5" className={fid + "ContentText"}>
          Because your project needs more colors.
        </Typography>
      </div>
      <div className={fid + "RightFileImage"}>
        <Image
          alt="bitmoji image"
          height={425}
          width={425}
          src="/images/browse_bitmoji.png"
          blurDataURL="data:..."
          placeholder="blur"
        />
      </div>
      <div className={fid + "ArrowIconWrapper"}>
        <Typography variant="body2" className={fid + "Browse"}>
          Browse more
        </Typography>
        <EastIcon className={fid + "ArrowIcon"} />
      </div>
    </div>
  )
}

export default BrowseCard
