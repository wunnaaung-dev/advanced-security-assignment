import NavBar from "./components/NavBar/NavBar"
import { TabBar } from "./components/Tabs/TabBar"

function App() {


  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center gap-5 h-screen">
        <h1 className="text-lg font-semibold">You have to sign up for an account to participate in the online community</h1>
        <TabBar />
      </div>
    </>

  )
}

export default App
