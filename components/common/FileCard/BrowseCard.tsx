import { Typography } from "@mui/material"
import EastIcon from "@mui/icons-material/East"
import GrainIcon from "@mui/icons-material/Grain"
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import { RootType } from "../../../redux/constants/stateTypes"

interface BrowseCardProps {
  fid: string
}

const BrowseCard = ({ fid }: BrowseCardProps) => {
  const content = useSelector((state: RootType) => state.contentSlice.data)

  return (
    <div className={fid + "RightFileContent"}>
      <div className={fid + "Content"}>
        <GrainIcon className={fid + "GrainIcon"} />
        <Typography variant="h5" className={fid + "ContentText"}>
          {content.browseCardContent}
        </Typography>
      </div>
      <div className={fid + "RightFileImage"}>
        <Image
          alt="bitmoji image"
          height={425}
          width={425}
          src="/images/browse_bitmoji.webp"
          priority
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
