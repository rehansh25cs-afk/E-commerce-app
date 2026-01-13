import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import Allproducts from './Pages/Allproducts'
import ProductDetails from './Pages/ProductDetails'

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className=' w-full h-screen '>
      {windowWidth >= 650 && <Navbar />}

      <Routes>
        <Route path='/' element={<Allproducts />} />
        <Route path='/product/:id' element={<ProductDetails />} />
      </Routes>



    </div>
  )
}

export default App
