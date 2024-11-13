import Home from "./components/Home/Home"
import { TabBar } from "./components/Tabs/TabBar"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: "/",
    element: <TabBar />
  },
  {
    path: "home",
    element: <Home />
  }
])


function App() {
  return (
   <RouterProvider router={router}/>
  )
}

export default App
