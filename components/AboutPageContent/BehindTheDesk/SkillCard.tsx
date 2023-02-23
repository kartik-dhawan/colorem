import { Box } from "@mui/material"

interface SkillType {
  order: number
  techName: string
  techLabel: string
  fluency: number
  adaptability: number
  professionalExperience: number
  handsOnExperience: number
  projects: number
}

interface SkillCardProps {
  skillDetails: SkillType
}

const SkillCard = ({ skillDetails }: SkillCardProps) => {
  console.log(skillDetails)
  return (
    <>
      <Box></Box>
    </>
  )
}

export default SkillCard
