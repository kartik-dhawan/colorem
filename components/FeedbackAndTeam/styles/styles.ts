export const styles = {
  // TEAM SECTION STYLES
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

  // FEEDBACK SECTION STYLES
  feedbackSectionTitle: {
    fontSize: "22px",
    margin: "0px 30px 20px 10px",
    textTransform: "uppercase",
    fontWeight: 500,
    letterSpacing: "0.5px",
  },
  feedbackcard: {
    display: "flex",
    color: "#d9d9d9", // text_primary
    backgroundColor: "#222", // background_primary_lighter
    borderRadius: "18px",
    padding: "17px 27px",
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    boxShadow: "0px 0px 35px -8px rgba(218, 223, 196, 0.193)",
    margin: {
      xs: "12px 2px 24px 2px",
      sm: "12px 30px 24px 0px",
    },
  },
}
