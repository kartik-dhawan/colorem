export const styles = {
  // folder shape containers
  fileSectionCardLowerRight: {
    borderRadius: {
      xs: "30px 0px 30px 30px",
      md: "30px 0px 30px 30px",
    },
    marginRight: "1.5rem",
    background: "linear-gradient(180deg, #19c7a20d 0%, #51bdd938 90%)", // green - green_color_1, green_color_2
    boxShadow: "0 2px 40px -18px #8787875c",
    backdropFilter: "blur( 4px )",
    height: {
      xs: "335px",
      sm: "350px",
      md: "400px",
      lg: "500px",
    },
  },
  fileSectionCardLowerLeft: {
    borderRadius: {
      xs: "0px 30px 30px 30px",
      md: "0px 30px 30px 30px",
    },
    marginLeft: "1.5rem",
    minHeight: {
      xs: "335px",
      sm: "350px",
      md: "400px",
      lg: "500px",
    },
    height: "max-content",
    border: "1px solid #fff3",
    boxShadow: "0 2px 32px -18px #8787875c",
    backdropFilter: "blur( 4px )",
  },

  // palettes preview card styling
  fileSectionPreviewCardWrapper: {
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
  },
  fileSectionPreviewPaletteColorsWrapper: {
    display: "flex",
    height: {
      xs: "48px",
      sm: "64px",
      md: "48px",
      lg: "52px",
    },
  },
  fileSectionPreviewPaletteColor: {
    height: "100%",
    flexGrow: 1,
    transition: "500ms all ease",
    "&:first-of-type": {
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
    "&:hover::after": {
      opacity: 1,
    },
  },
  fileSectionPreviewPaletteColorAfter: {
    height: "100%",
    display: "flex",
    opacity: 0,
    fontWeight: 300,
    fontSize: {
      xs: "10px",
      lg: "12px",
    },
    alignItems: "center",
    justifyContent: "center",
  },
  fileSectionPreviewPaletteName: {
    textTransform: "capitalize",
    fontWeight: 300,
    paddingTop: "4px",
  },
  fileSectionViewMore: {
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
  },
  // fileSection
}
