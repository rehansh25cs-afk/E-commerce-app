import React, { createContext, useEffect, useState } from 'react'
import { getData } from '../Api/Getdata'

export const ProductDataContext = createContext()

const ProductContext = ({ children }) => {

    const [productData, setProductData] = useState([])

    

    useEffect(() => {
        const fetchData = async ()=>{
            const setData = await getData()
            setProductData(setData)
        }
        
        fetchData()

    }, [])

    return (
        <>
        
        <ProductDataContext.Provider value={productData}>
            {children}

        </ProductDataContext.Provider>
        </>

    )
}

export default ProductContext
