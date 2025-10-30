import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <HomePage/>
      
    </BrowserRouter>
  )
}

export default App