import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProductDataContext } from '../Context/ProductContext'

const ProductDetails = () => {

  let { id } = useParams()

  const productData = useContext(ProductDataContext)

  let selectedProduct = ''
  if (productData.length > 0) {

    selectedProduct = productData.find((elem) => elem.id == id)
  }



  return (
    <div className='grid grid-cols-1 sm:grid-cols-2'>
      <div className="left px-30 py-20 flex items-center justify-center  ">

        <img className=' w-[70%] h-100 object-cover object-center rounded-3xl ' src={selectedProduct.images[1]} alt="" />

      </div>
      <div className="right flex flex-col gap-10 px-20 py-20 ">

        <div className=' flex flex-col gap-3 '>

          <p className='font-light text-[13px]'>{selectedProduct.category.name}</p>
          <h1 className='font-bold text-2xl '>{selectedProduct.title}</h1>
          <h1 className='font-bold '>$ {selectedProduct.price}</h1>

        </div>

        <div className=' flex flex-col gap-4 '>

          <h1 className='font-bold text-xl'>Description</h1>
          <p className='text-md font-light'>
            {selectedProduct.description}
          </p>

        </div>

      </div>

    </div>
  )
}

export default ProductDetails
