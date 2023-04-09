import {
  API_URLS,
  initialDashboardPalettesData,
} from "../../../utils/constants"
import { PaletteDataType } from "../../../utils/interfaces"
import {
  LightenDarkenColor,
  fetcher,
  getShuffledArray,
  lightOrDark,
} from "../../../utils/methods"
import useSWR from "swr"
import { Box, Container, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect, useId, useState } from "react"
import { styles } from "./styles"

interface PalettesPreviewProps {
  fid: string
}

const PalettesPreviewCard = ({ fid }: PalettesPreviewProps) => {
  const id = useId()

  const [useablePalettesData, setUseablePalettesData] = useState<
    PaletteDataType[]
  >(initialDashboardPalettesData)

  const { data, error, isLoading } = useSWR<PaletteDataType[]>(
    API_URLS.GET_ALL_PALETTES,
    fetcher
  )

  useEffect(() => {
    !isLoading // eslint-disable-line
      ? data && setUseablePalettesData(getShuffledArray(data, 4))
      : setUseablePalettesData(initialDashboardPalettesData)
  }, [isLoading, data])

  return (
    <Container
      className={fid + "PreviewCardWrapper"}
      id={fid + "PreviewCardWrapper"}
      sx={styles.fileSectionPreviewCardWrapper}
    >
      {!error ? (
        <>
          {useablePalettesData.map((palette: PaletteDataType) => {
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
        </>
      ) : (
        <div>Error</div>
      )}
    </Container>
  )
}

export default PalettesPreviewCard
