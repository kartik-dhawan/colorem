import { PaletteDataType } from "../../../utils/interfaces"
import {
  LightenDarkenColor,
  getShuffledArray,
  lightOrDark,
} from "../../../utils/methods"
import { Box, Container, Skeleton, Typography } from "@mui/material"
import Link from "next/link"
import React, { useEffect, useId, useState } from "react"
import { styles } from "./styles"
import { useSelector } from "react-redux"
import { RootType } from "../../../redux/constants/stateTypes"
import { INTERNAL_API_FAIL_ERROR_MESSAGE } from "../../../utils/constants"

interface PalettesPreviewProps {
  fid: string
}

const PalettesPreviewCard = ({ fid }: PalettesPreviewProps) => {
  const id = useId()

  const [dataTimeout, setDataTimeout] = useState<boolean>(false)

  const { data } = useSelector((state: RootType) => state.paletteSlice)

  useEffect(() => {
    data.length === 0 && // eslint-disable-line
      setTimeout(() => {
        setDataTimeout(true)
      }, 10000)
  }, [data])

  return (
    <>
      {data.length !== 0 ? (
        <Container
          className={fid + "PreviewCardWrapper"}
          id={fid + "PreviewCardWrapper"}
          sx={styles.fileSectionPreviewCardWrapper}
        >
          {getShuffledArray(data, 4).map((palette: PaletteDataType) => {
            return (
              <Box
                key={palette._id}
                className={fid + "PreviewPaletteWrapper"}
                id={id + fid + "PreviewPaletteWrapper"}
              >
                <Box
                  className={fid + "PreviewPaletteColorsWrapper"}
                  id={id + fid + "PreviewPaletteColorsWrapper"}
                  sx={styles.fileSectionPreviewPaletteColorsWrapper}
                >
                  {palette.hex.map((hex: string) => {
                    return (
                      <Box
                        key={id + hex}
                        className={fid + "PreviewPaletteColor"}
                        id={id + fid + "PreviewPaletteColor"}
                        sx={{
                          backgroundColor: `#${
                            lightOrDark(hex) === "light"
                              ? LightenDarkenColor(hex, -30)
                              : hex
                          }`,
                          "&::after": {
                            content: {
                              xs: `"#${hex}"`, // eslint-disable-line
                              md: `""`, // eslint-disable-line
                              lg: `"#${hex}"`, // eslint-disable-line
                            },
                            color: `#${
                              lightOrDark(hex) === "dark" ? "c4c4c4" : "333"
                            }`,
                            ...styles.fileSectionPreviewPaletteColorAfter,
                          },
                          ...styles.fileSectionPreviewPaletteColor,
                        }}
                      ></Box>
                    )
                  })}
                </Box>
                <Typography
                  className={fid + "PreviewPaletteName"}
                  id={id + fid + "PreviewPaletteName"}
                  variant="body1"
                  sx={styles.fileSectionPreviewPaletteName}
                >
                  {palette.name}
                </Typography>
              </Box>
            )
          })}
          <Link href="/palettes">
            <Typography sx={styles.fileSectionViewMore}>View more</Typography>
          </Link>
        </Container>
      ) : (
        <Container sx={styles.fileSectionPreviewCardWrapper}>
          {dataTimeout ? (
            INTERNAL_API_FAIL_ERROR_MESSAGE.ALL_PALETTES
          ) : (
            <>
              <Skeleton
                variant="rectangular"
                height={56}
                width={"100%"}
                sx={styles.fileSectionSkeleton}
              />
              <Skeleton
                variant="rectangular"
                height={56}
                width={"100%"}
                sx={{
                  ...styles.fileSectionSkeleton,
                  animationDelay: "150ms",
                }}
              />
              <Skeleton
                variant="rectangular"
                height={56}
                width={"100%"}
                sx={{
                  ...styles.fileSectionSkeleton,
                  animationDelay: "450ms",
                }}
              />
              <Skeleton
                variant="rectangular"
                height={56}
                width={"100%"}
                sx={{
                  ...styles.fileSectionSkeleton,
                  animationDelay: "300ms",
                }}
              />
            </>
          )}
        </Container>
      )}
    </>
  )
}

export default PalettesPreviewCard
