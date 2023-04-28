export const styles = {
  // primary alert - copy
  primaryAlertWrapper: {
    position: "fixed",
    display: "flex",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "10000",
  },
  primaryAlertTitle: {
    height: "max-content",
    padding: "15px 45px",
    borderRadius: "10px",
    fontSize: {
      sx: "18px",
      md: "20px",
      xl: "22px",
    },
    fontWeight: {
      xs: 300,
      xl: 400,
    },
    color: "#d9d9d9", // text_primary
    backgroundColor: "#222", // background_primary_lighter
    textTransform: "capitalize",
    opacity: 0.85,
    letterSpacing: "1px",
  },

  // auth alert
  authAlertWrapper: {
    position: "absolute",
    bottom: "72px",
  },
  authAlertTitleWrapper: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  authAlertTitle: {
    textTransform: "uppercase",
    fontWeight: 400,
    fontSize: "16px",
    letterSpacing: "1px",
  },
  authAlertDetailsButton: {
    textTransform: "capitalize",
    color: "#b1b1b1",
    fontWeight: 300,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  authAlertDetailsBody: {
    fontWeight: 300,
    fontStyle: "italic",
    fontSize: "14px",
  },
}
