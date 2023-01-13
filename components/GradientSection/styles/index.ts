import { BoxTypeStylesType } from "../../../utils/interfaces"

export const styles = {
  gradientSectionTabs: {
    color: "#d9d9d9",
    fontSize: {
      xs: "13px",
      md: "15px",
      xl: "16px",
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
      backgroundColor: "#c7b4b4", // $text_primary_dull
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
  },
  gradientSectionColorBoxWrapper: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gridAutoRows: "1fr",
    gridAutoFlow: "row dense",
    gridGap: "10px",
    padding: "20px 0px",
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
