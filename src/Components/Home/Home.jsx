import React from 'react'
import Header from "../Header/Header"
import ShopByCategory from '../ShopByCategory/ShopByCategory';
import Products from '../Products/Products';
function Home() {
    return (
        <div className='text-blackColor'>
            <Header />
            <ShopByCategory />
            <Products/>
        </div>
    )
}

export default Home
