export const styles = {
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
}
