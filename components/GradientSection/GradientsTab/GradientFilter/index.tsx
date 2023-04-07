import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import { pid } from "process"
import { useCallback, useState } from "react"
import ClearIcon from "@mui/icons-material/Clear"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { styles as SubMenuStyles } from "../../../PaletteSection/styles/styles"
import { styles } from "../../styles/gradientFilterStyles"
import ColorOptions from "./ColorOptions"
import NumberOptions from "./NumberOptions"
import { useDispatch } from "react-redux"
import {
  toggleSelectedColor,
  toggleSelectedColorsNumber,
} from "../../../../redux/slices/toggleSlice"
import {
  ColorNumberOptionsConstants,
  ColorOptionConstants,
} from "../../../../utils/constants"
import { ColorListType } from "../../../../utils/interfaces"

const GradientFilter = () => {
  const gid = "gradientFilter"
  const dispatch = useDispatch()

  const [filterType, setFilterType] = useState<string>("")
  const [colorOptionsList, setColorOptionsList] =
    useState<ColorListType[]>(ColorOptionConstants)
  const [isColorSelected, setIsColorSelected] = useState<boolean>(false)
  const [colorNumbersList, setColorNumbersList] = useState<number[]>(
    ColorNumberOptionsConstants
  )
  const [isNumberSelected, setIsNumberSelected] = useState<boolean>(false)

  // for toggling submenu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleCloseFilter = () => {
    setFilterType("")
    setColorOptionsList(ColorOptionConstants)
    setIsColorSelected(false)
    dispatch(toggleSelectedColor(""))
    setColorNumbersList(ColorNumberOptionsConstants)
    setIsNumberSelected(false)
    dispatch(toggleSelectedColorsNumber(null))
  }

  const handleSubMenuIconClick = (event: React.MouseEvent<HTMLElement>) => {
    handleCloseFilter()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      className={gid + "Wrapper"}
      id={gid + "Wrapper"}
      sx={{
        display: {
          md: "flex",
        },
        alignItems: "center",
      }}
    >
      <Box
        sx={styles.gradientFilterToggleWrapper}
        className={gid + "ToggleWrapper"}
        id={gid + "ToggleWrapper"}
      >
        <Button
          sx={styles.gradientFilterSubMenuBtn}
          aria-controls={open ? "customized-sub-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleSubMenuIconClick}
          disableRipple
          className={gid + "SubMenuBtn"}
          id={gid + "SubMenuBtn"}
        >
          Filters <ArrowRightIcon />
        </Button>
        {filterType !== "" && (
          <>
            <Typography
              sx={styles.gradientFilterToggleRoute}
              className={gid + "ToggleRoute"}
            >
              / <span>{filterType}</span>
            </Typography>
            {/* cross button to clear the filter */}
            <IconButton
              onClick={handleCloseFilter}
              sx={styles.gradientFilterClearTypeBtn}
              className={gid + "ClearTypeBtn"}
            >
              <ClearIcon />
            </IconButton>
          </>
        )}
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          elevation={0}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={SubMenuStyles.optionsBarMenu}
        >
          <MenuItem
            disableRipple
            className={pid + "SubMenuItem"}
            onClick={useCallback(() => {
              setFilterType("Color")
              setAnchorEl(null)
            }, [])}
            sx={SubMenuStyles.optionsBarSubMenuItem}
          >
            By Color
          </MenuItem>
          <Divider />
          <MenuItem
            disableRipple
            className={pid + "SubMenuItem"}
            onClick={useCallback(() => {
              setFilterType("Number")
              setAnchorEl(null)
            }, [])}
            sx={SubMenuStyles.optionsBarSubMenuItem}
          >
            By number of colors
          </MenuItem>
        </Menu>
      </Box>
      <Box
        className={gid + "OptionsBody"}
        id={gid + "OptionsBody"}
        sx={{
          padding: {
            md: "0px 30px",
          },
        }}
      >
        {filterType === "Color" && (
          <ColorOptions
            setIsColorSelected={setIsColorSelected}
            isColorSelected={isColorSelected}
            setColorOptionsList={setColorOptionsList}
            colorOptionsList={colorOptionsList}
          />
        )}
        {filterType === "Number" && (
          <NumberOptions
            setColorNumbersList={setColorNumbersList}
            colorNumbersList={colorNumbersList}
            isNumberSelected={isNumberSelected}
            setIsNumberSelected={setIsNumberSelected}
          />
        )}
      </Box>
    </Box>
  )
}

export default GradientFilter
