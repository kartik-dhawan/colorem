import {
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { Dispatch, SetStateAction, useId } from "react"
import TouchAppIcon from "@mui/icons-material/TouchApp"
import SpaceBarIcon from "@mui/icons-material/SpaceBar"
import { styles } from "./styles"

interface InstructorObject {
  icon?: string
  instruction: string
  id: number
}

interface InstructorPropsType {
  instructorData: InstructorObject[]
  setShowInstructor: Dispatch<SetStateAction<boolean>>
}

const Instructor = ({
  instructorData,
  setShowInstructor,
}: InstructorPropsType) => {
  const iid = "instructor"
  const id = useId()

  return (
    // difference between <Container /> & <Box /> is that Container has default horizontal margin
    <Container
      className={iid + "Wrapper"}
      id={iid + "Wrapper"}
      sx={styles.instructorWrapper}
    >
      <List
        className={iid + "TextList"}
        id={iid + "TextList"}
        sx={styles.instructorTextList}
      >
        {instructorData?.map((item) => {
          return (
            <ListItem
              key={item.id}
              className={iid + "TextListItem"}
              id={id + iid + "TextListItem"}
              sx={styles.instructorTextListItem}
            >
              <ListItemIcon
                className={iid + "TextIcon"}
                id={id + iid + "TextIcon"}
                sx={styles.intstructorTextIcon}
              >
                {item.icon === "tap" && <TouchAppIcon />}
                {item.icon === "spacebar" && <SpaceBarIcon />}
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                className={iid + "ItemText"}
                id={id + iid + "ItemText"}
                sx={styles.instructorItemText}
              >
                {item.instruction}
              </ListItemText>
            </ListItem>
          )
        })}
      </List>
      <Button
        className={iid + "OKBtn"}
        id={iid + "OKBtn"}
        sx={styles.instructorOKBtn}
        onClick={() => {
          setShowInstructor(false)
          // persists the state of shhowInstructor
          // so that user doesn't get this popup everytime
          sessionStorage.setItem("persistPaletteInstructor", "visited")
        }}
      >
        Understood!
      </Button>
    </Container>
  )
}

export default Instructor
