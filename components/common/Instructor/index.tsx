import {
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { Dispatch, SetStateAction, useEffect } from "react"
import CropSquareIcon from "@mui/icons-material/CropSquare"

interface InstructorObject {
  icon?: string
  instruction: string
  id: number
}

interface InstructorPropsType {
  instructorData: InstructorObject[]
  setShowInstructor: Dispatch<SetStateAction<boolean>>
}

const Instructor = ({ instructorData }: InstructorPropsType) => {
  useEffect(() => {
    console.log(instructorData)
  }, [instructorData])

  return (
    // difference between <Container /> & <Box /> is that Container has default horizontal margin
    <Container>
      <List>
        {instructorData?.map((item) => {
          return (
            <ListItem key={item.id}>
              <ListItemIcon sx={{ color: "#d9d9d9" }}>
                <CropSquareIcon />
              </ListItemIcon>
              <ListItemText disableTypography={true}>
                {item.instruction}
              </ListItemText>
            </ListItem>
          )
        })}
      </List>
      <Button>Understood!</Button>
    </Container>
  )
}

export default Instructor
