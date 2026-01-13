import React, { useContext } from 'react'
import { ProductDataContext } from '../Context/ProductContext'
import { Link } from 'react-router-dom'

const Allproducts = () => {

    const productData = useContext(ProductDataContext)
    

    return (
        <div className='p-10'>

            <h1 className='flex justify-center mb-10 text-4xl font-medium '>Discover Our All Products</h1>

            <div className='flex flex-wrap justify-center gap-20 px-18 '>
                {productData.map((elem, idx) => {
                    return (
                        <Link to={`/product/${elem.id}`} key={idx} href="" className=' hover:border hover:scale-110 transition-transform duration-300 ease-out w-60 font-medium flex flex-col gap-7 rounded-2xl pb-5 '>

                            <img src={elem.images[0]} className=' h-[65%] w-full object-cover object-center rounded-2xl ' alt="" />
                            <h2 className=' text-center text-xl '>{elem.title}</h2>

                            <div className=' flex justify-between items-center px-5 sm: flex-col   '>
                                <h2 className='text-lg'>$ {elem.price} </h2>
                                <button className=' bg-red-500 text-white px-2 py-2 rounded-lg '>Buy Now</button>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Allproducts;
