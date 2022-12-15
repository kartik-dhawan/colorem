export const styles = {
  footerBoxWrapper: {
    backgroundColor: "#111",
    borderTop: "1px solid #333",
    // background: "linear-gradient(180deg, #111 40%, #222 95%)",
    padding: "2rem 0rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  footerBoxIcon: {
    margin: "5px 15px",
    color: "#d9d9d9",
    fontSize: {
      xs: "45px",
      sm: "53px",
    },
    cursor: "pointer",
  },
  footerBoxBody: {
    textAlign: "center",
    fontSize: {
      xs: "18px",
      sm: "19px",
    },
    padding: {
      xs: "0rem 2rem",
      sm: "0rem 4rem",
    },
    fontWeight: 300,
    fontFamily: "Nunito Sans",
    color: "#ebe1e1", // text_third
    "& > a": {
      color: "#0071f3f5",
      transition: "100ms all ease-in-out",
      "&:hover": {
        color: "#3688e6f5", // next_blue - just lighter
      },
    },
  },
  footerBoxReferenceWrapper: {
    display: "flex",
    flexWrap: "wrap",
    margin: "30px 0px",
    justifyContent: "center",
  },
  footerBoxReference: {
    "& > a": {
      color: "#c7b4b4", // text_primary_dull
      fontSize: "17px",
      padding: {
        xs: "0px 20px",
        sm: "0px 30px",
      },
      "&:hover": {
        color: "#d9d9d9", // text_primary
      },
    },
  },
}
