import { Typography } from "@mui/material"
import EastIcon from "@mui/icons-material/East"
import GrainIcon from "@mui/icons-material/Grain"
import Image from "next/image"
import Link from "next/link"

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
        />
      </div>
      <Link href="/palettes" className={fid + "ArrowIconWrapper"}>
        <div className={fid + "Browse"}>Browse more</div>
        <EastIcon className={fid + "ArrowIcon"} />
      </Link>
    </div>
  )
}

export default BrowseCard
