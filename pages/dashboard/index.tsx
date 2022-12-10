import { Box } from "@mui/material"
import SubNav from "../../components/common/Navbar/SubNav"
import FileSection from "../../components/FileSection"
import Essentials from "../../components/Essentials"
import FeedbackAndTeam from "../../components/FeedbackAndTeam"
import { client } from "../../utils/contentful/config"
import { ContentfulType } from "../../utils/interfaces"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateContent } from "../../redux/slices/contentSlice"

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: "coloremDashboard" }) // eslint-disable-line

  return {
    props: {
      data: response?.items[0]?.fields,
    },
  }
}

const Dashboard = ({ data }: ContentfulType) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateContent(data))
  }, [data])

  return (
    <Box>
      <SubNav content={data} />
      <FileSection />
      <FeedbackAndTeam />
      <Essentials />
    </Box>
  )
}

export default Dashboard
