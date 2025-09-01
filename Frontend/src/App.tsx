import Dashbord from "./Page/Dashbord"
import { Signin } from "./Page/signin"
import { Signup } from "./Page/signup"

import { BrowserRouter , Routes , Route } from "react-router-dom"



function App() {
     
  return <BrowserRouter>
  <Routes>
    <Route path="/Signup" element={<Signup/>}/>
    <Route path="/Signin" element={<Signin/>}/>
     <Route path="/Dashbord" element={<Dashbord/>}/>
  </Routes>
      </BrowserRouter>
   
}

export default App
