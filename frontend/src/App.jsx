import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/category/:param' element={<CategoryPage/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer/>
      
    </BrowserRouter>
  )
}

export default App