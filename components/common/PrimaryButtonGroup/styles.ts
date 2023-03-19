const reusableStyles = {
  buttonGroupButton: {
    fontWeight: 500,
    fontSize: {
      xs: "16px",
      md: "18px",
      xl: "20px",
    },
  },
}

export const styles = {
  buttonGroupWrapper: {
    margin: "16px 0px",
    display: "flex",
    justifyContent: "flex-end",
  },
  buttonGroupSelectedButton: {
    ...reusableStyles.buttonGroupButton,
    color: "#c4c4c4",
    borderColor: "#111",
    backgroundColor: "#111",
    "&:hover": {
      borderColor: "#444",
      backgroundColor: "#444",
    },
  },
  buttonGroupUnselectedButton: {
    ...reusableStyles.buttonGroupButton,
    color: "#111",
    borderColor: "#111",
    "&:hover": {
      borderColor: "#444",
      backgroundColor: "#999999",
    },
  },
}
