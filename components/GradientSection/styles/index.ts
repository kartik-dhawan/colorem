import { BoxTypeStylesType } from "../../../utils/interfaces"

export const styles = {
  gradientSectionTabsWrapper: {
    borderBottom: 1,
    borderColor: "divider",
    display: "flex",
    justifyContent: "space-between",
  },
  gradientSectionTabs: {
    color: "#d9d9d9",
    fontSize: {
      xs: "15px",
      md: "16px",
      xl: "17px",
      lg: "19px",
    },
    fontWeight: 300,
    padding: "0px 4px",
    marginRight: {
      xs: "10px",
      md: "20px",
      xl: "25px",
    },
    "&.Mui-selected": {
      color: "#d9d9d9",
    },
    "& .MuiTabs-indicatorSpan": {
      backgroundColor: "#c0c3c6", // $text_primary_dull
    },
  },
  gradientSectionColorBox: {
    position: "relative",
    padding: "20px",
    minHeight: "100px",
    "&::before": {
      content: `""`, // eslint-disable-line
      display: "block",
      width: "100%",
      // paddingTop: "50%",
    },
    "&::after": {
      position: "absolute",
      width: "100%",
      height: "100%",
      content: `""`, // eslint-disable-line
      display: "flex",
      top: 0,
      left: 0,
    },
    "&:hover": {
      backgroundColor: "#222",
      opacity: 0.9,
    },
    "&:hover .gradientBoxHoverWrapper": {
      display: "flex",
    },
  },
  gradientSectionBoxTitleText: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    backgroundColor: "#33333385",
    fontWeight: 300,
    fontSize: {
      xs: "16px",
      md: "14px",
      xl: "16px",
    },
    padding: {
      xs: "2px 12px",
      md: "3px 12px",
    },
    borderRadius: "100px",
  },
  gradientSectionColorBoxWrapper: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gridAutoRows: "1fr",
    gridAutoFlow: "row dense",
    gridGap: "10px",
    padding: "10px 0px",
  },
  gradientSectionLoaderWrapper: {
    height: "80vh",
    display: "flex",
    alignItems: "center",
  },
  gradientBoxHoverWrapper: {
    position: "absolute",
    top: "0%",
    left: "0%",
    height: "100%",
    width: "100%",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
  },
  gradientBoxActionBtnsWrapper: {
    backgroundColor: "#90909059",
    padding: "5px 10px",
    borderRadius: "100px",
    display: "flex",
    gap: "5px",
  },
}

export const gradientBoxTypeStyles: BoxTypeStylesType = {
  tall: {
    gridColumn: {
      xs: "span 2",
      sm: "span 1",
    },
    gridRow: {
      xs: "span 1",
      sm: "span 2",
    },
  },
  wide: {
    gridColumn: {
      xs: "span 2",
    },
    gridRow: {
      xs: "span 1",
    },
  },
  square: {
    gridColumn: {
      xs: "span 2",
      sm: "span 1",
    },
    gridRow: {
      xs: "span 1",
      sm: "span 1",
    },
  },
  largeSquare: {
    gridColumn: {
      xs: "span 2",
      sm: "span 2",
    },
    gridRow: {
      xs: "span 1",
      sm: "span 2",
    },
  },
}
