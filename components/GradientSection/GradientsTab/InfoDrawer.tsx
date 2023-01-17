import { Drawer } from "@mui/material"
import { Dispatch, SetStateAction, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { RootType } from "../../../redux/constants/stateTypes"

interface InfoDrawerProps {
  infoDrawerToggle: boolean
  setInfoDrawerToggle: Dispatch<SetStateAction<boolean>>
}

const InfoDrawer = ({
  infoDrawerToggle,
  setInfoDrawerToggle,
}: InfoDrawerProps) => {
  const iid = "gradientInfoDrawer"

  const infoDrawerCloseHandler = useCallback(() => {
    setInfoDrawerToggle(false)
  }, [])

  const { gradient } = useSelector((state: RootType) => state.gradientSlice)
  useEffect(() => {
    console.log(gradient)
  }, [gradient])

  return (
    <Drawer
      anchor={"right"}
      open={infoDrawerToggle}
      onClose={infoDrawerCloseHandler}
      className={iid}
      id={iid}
      transitionDuration={400}
      sx={{
        // position: "absolute",
        "& .MuiDrawer-paper": {
          width: "70vw",
          height: "100%",
          backgroundColor: "#111",
          color: "#d9d9d9",
          display: "flex",
        },
      }}
    ></Drawer>
  )
}

export default InfoDrawer
