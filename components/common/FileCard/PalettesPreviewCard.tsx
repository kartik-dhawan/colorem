import { API_URLS } from "../../../utils/constants"
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
            padding: "2rem 1.5rem",
            position: "relative",
            gap: {
              xs: "16px",
              sm: "8px",
            },
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
                    height: {
                      xs: "48px",
                      sm: "64px",
                      md: "48px",
                      lg: "52px",
                    },
                  }}
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
                          height: "100%",
                          flexGrow: 1,
                          transition: "500ms all ease",
                          "&:first-child": {
                            borderRadius: "8px 0px 0px 8px",
                          },
                          "&:last-child": {
                            borderRadius: "0px 8px 8px 0px",
                          },
                          "&:hover": {
                            flexGrow: {
                              xs: 2,
                              sm: 4,
                              md: 3,
                              lg: 20,
                            },
                          },
                          "&::after": {
                            content: {
                              xs: `"#${hex}"`, // eslint-disable-line
                              md: `""`, // eslint-disable-line
                              lg: `"#${hex}"`, // eslint-disable-line
                            },
                            height: "100%",
                            display: "flex",
                            opacity: 0,
                            fontWeight: 300,
                            fontSize: {
                              xs: "10px",
                              lg: "12px",
                            },
                            color: `#${
                              lightOrDark(hex) === "dark" ? "c4c4c4" : "333"
                            }`,
                            alignItems: "center",
                            justifyContent: "center",
                          },
                          "&:hover::after": {
                            opacity: 1,
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
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 300,
                    paddingTop: "4px",
                  }}
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
                right: "24px",
                bottom: "16px",
                color: "#d9d9d9",
                borderBottom: "0.5px solid #c4c4c4",
                fontFamily: "Roboto condensed",
                fontWeight: 300,
                letterSpacing: "0.5px",
                transition: "150ms all ease",
                "&:hover": {
                  color: "#959595",
                },
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
