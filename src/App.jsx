import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Allproducts from './Pages/Allproducts'
import ProductDetails from './Pages/ProductDetails'
import About from './Pages/About'
import Contact from './Pages/Contact'

const App = () => {
  return (
    <div className='w-full min-h-screen'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Allproducts />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
