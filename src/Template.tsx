import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'

const Template = () => {
  return (
    <>
        <NavBar />
        <Outlet />
    </>
  )
}

export default Template