import SyntaxHighlighter from "react-syntax-highlighter"

import * as themes from "react-syntax-highlighter/dist/cjs/styles/hljs"
import { Box, SxProps, Theme } from "@mui/material"

const SyntaxHighlightBox = ({
  body,
  language,
  sx,
}: {
  body: string
  language: string
  sx: SxProps<Theme>
}) => {
  const iid = "infoDrawer"
  return (
    <Box sx={sx} className={iid + "CodeBox"} id={iid + "CodeBox"}>
      <SyntaxHighlighter
        language={language}
        style={themes.atomOneDark}
        customStyle={{
          padding: "1.5em 2em",
          minHeight: "7rem",
          backgroundColor: "#181818",
          boxShadow: "0px 0px 36px -30px #d9d9d9",
        }}
      >
        {body}
      </SyntaxHighlighter>
    </Box>
  )
}

export default SyntaxHighlightBox
