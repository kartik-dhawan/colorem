import { API_URLS } from "../../../utils/constants"
import { PaletteDataType } from "../../../utils/interfaces"
import { fetcher, getShuffledArray } from "../../../utils/methods"
import useSWR from "swr"
import { Box, Container, Typography } from "@mui/material"
import Link from "next/link"
import { useId } from "react"

interface PalettesPreviewProps {
  fid: string
}

const PalettesPreviewCard = ({ fid }: PalettesPreviewProps) => {
  const id = useId()

  const { data, error, isLoading } = useSWR<PaletteDataType[]>(
    API_URLS.GET_ALL_PALETTES,
    fetcher
  )

  // const randomPalettes = data && getShuffledArray(data, 4)

  return (
    <>
      {isLoading ? (
        <div>loading....</div>
      ) : !error && data ? (
        <Container
          className={fid + "PreviewCardWrapper"}
          id={fid + "PreviewCardWrapper"}
          sx={{
            display: "flex",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-around",
            padding: "2rem 0px",
            position: "relative",
          }}
        >
          {getShuffledArray(data, 4)?.map((palette: PaletteDataType) => {
            console.log(palette)
            return (
              <Box
                key={palette._id}
                className={fid + "PreviewPaletteWrapper"}
                id={id + fid + "PreviewPaletteWrapper"}
              >
                <Box
                  className={fid + "PreviewPaletteColorsWrapper"}
                  id={id + fid + "PreviewPaletteColorsWrapper"}
                  sx={{
                    display: "flex",
                    height: "56px",
                  }}
                >
                  {palette.hex.map((hex: string) => {
                    return (
                      <Box
                        key={id + hex}
                        className={fid + "PreviewPaletteColor"}
                        id={id + fid + "PreviewPaletteColor"}
                        sx={{
                          backgroundColor: `#${hex}`,
                          height: "100%",
                          flexGrow: 1,
                          transition: "200ms all ease",
                          "&:hover": {
                            flexGrow: 3,
                          },
                        }}
                      ></Box>
                    )
                  })}
                </Box>
                <Typography
                  className={fid + "PreviewPaletteName"}
                  id={id + fid + "PreviewPaletteName"}
                  variant="body1"
                >
                  {palette.name}
                </Typography>
              </Box>
            )
          })}
          <Link href="/palettes">
            <Typography
              sx={{
                position: "absolute",
                right: 0,
                bottom: 0,
                color: "#d9d9d9",
                borderBottom: "1px solid #c4c4c4",
              }}
            >
              View more
            </Typography>
          </Link>
        </Container>
      ) : (
        <div>Error</div>
      )}
    </>
  )
}

export default PalettesPreviewCard
