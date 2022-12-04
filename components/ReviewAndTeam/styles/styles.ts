export const styles = {
  teamSectionTitle: {
    backgroundColor: "#d9d9d9", // background_secondary
    borderRadius: "1000px",
    padding: {
      xs: "10px 40px",
    },
    fontSize: {
      xs: "17px",
      md: "19px",
    },
    "&:hover": {
      backgroundColor: "#d9d9d9", // background_secondary
    },
    "& > a": {
      color: "#111", // text_secondary
    },
  },
  teamSectionAvatarWrapper: {
    display: "flex",
    alignItems: "center",
    margin: {
      xs: "0px 45px",
      sm: "0px 65px",
    },
  },
  teamSectionBody: {
    fontSize: {
      xs: "20px",
      sm: "22px",
      md: "24px",
      lg: "28px",
    },
    fontWeight: 300,
    textTransform: "uppercase",
    color: "#d9d9d9", // text_primary
    textAlign: "left",
  },
}
