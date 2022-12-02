import Navbar from "./Navbar"

interface ChildrenType {
  children: JSX.Element
}

const Layout = ({ children }: ChildrenType) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
