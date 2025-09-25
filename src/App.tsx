import { Outlet } from "react-router"
import CommonLayout from "./components/layout/commonLayout"
import Navbar from "./pages/shared/Navbar"
import Footer from "./pages/shared/Footer"


function App() {
 

  return (
    <CommonLayout>
      <Navbar />
     <div className="min-h-screen">
       <Outlet />
     </div>
     <Footer />
    </CommonLayout>
  )
}

export default App