export const styles = {
  insightsSectionContentItemTitle: {
    fontSize: {
      xs: "22px",
      lg: "20px",
      xl: "22px",
    },
    lineHeight: {
      xs: "28px",
      lg: "26px",
      xl: "28px",
    },
    fontStyle: "italic",
  },
  insightsSectionContentItemText: {
    fontSize: {
      xs: "18px",
      xl: "20px",
    },
    fontWeight: 300,
    "& > div": {
      marginBottom: "12px",
    },
  },
  insightsSectionScrollButton: {
    position: "fixed",
    bottom: "50px",
    border: "2px solid #888",
    "& > svg": {
      backgroundColor: "#333",
      color: "#d9d9d9",
      borderRadius: "100px",
      padding: "8px",
      margin: "-4px",
    },
  },
}
