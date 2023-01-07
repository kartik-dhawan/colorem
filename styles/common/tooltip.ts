// a function that accepts the text to be displayed in the tooltip and returns a the css to display that tooltip
export const getTooltipStyles = (tooltipText: string) => {
  return {
    "&:hover::after": {
      content: `"${tooltipText}"`,
      position: "absolute",
      width: "max-content",
      left: "50%",
      top: "115%",
      transform: "translateX(-50%)",
      padding: "10px 14px",
      borderRadius: "5px",
      fontWeight: 300,
      fontSize: "15px",
      backgroundColor: "#333",
      opacity: "0.9",
    },
    ":hover:before": {
      content: `""`, // eslint-disable-line
      position: "absolute",
      width: "10px",
      height: "10px",
      opacity: "0.9",
      left: "50%",
      top: "105%",
      transform: "translateX(-50%) rotate(45deg)",
      backgroundColor: "#333",
    },
  }
}
