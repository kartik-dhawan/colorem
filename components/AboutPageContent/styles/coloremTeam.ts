const reusableStyles = {
  teamSectionRoleButton: {
    fontWeight: 500,
    fontSize: {
      xs: "16px",
      md: "18px",
      xl: "20px",
    },
  },
}

export const styles = {
  teamSectionTitle: {
    fontSize: {
      xs: "48px",
      sm: "48px",
      md: "64px",
    },
    textAlign: "right",
    display: "block",
    borderBottom: "2px solid #111",
  },
  teamSectionRoleButtonGroup: {
    margin: "16px 0px",
    display: "flex",
    justifyContent: "flex-end",
  },
  teamSectionUnselectedRoleButton: {
    ...reusableStyles.teamSectionRoleButton,
    color: "#111",
    borderColor: "#111",
    "&:hover": {
      borderColor: "#444",
      backgroundColor: "#999999",
    },
  },
  teamSectionSelectedRoleButton: {
    ...reusableStyles.teamSectionRoleButton,
    color: "#c4c4c4",
    borderColor: "#111",
    backgroundColor: "#111",
    "&:hover": {
      borderColor: "#444",
      backgroundColor: "#444",
    },
  },
  teamSectionRoleFunFact: {
    fontWeight: 300,
    textAlign: "right",
    fontSize: {
      xs: "16px",
      sm: "18px",
      lg: "17px",
      xl: "18px",
    },
    fontStyle: "italic",
  },
  teamSectionBodyText: {
    textAlign: "justify",
    margin: "16px 0px",
    fontSize: {
      xs: "16px",
      md: "18px",
      xl: "20px",
    },
    lineHeight: {
      xs: "22px",
      md: "24px",
      xl: "26px",
    },
    fontWeight: 400,
  },
}
