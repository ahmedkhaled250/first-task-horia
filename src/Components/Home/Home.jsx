import React from 'react'
import Header from "../Header/Header"
import ShopByCategory from '../ShopByCategory/ShopByCategory';
import Products from '../Products/Products';
import RequiredProducts from '../RequiredProducts/RequiredProducts';
function Home() {
    return (
        <div className='text-blackColor'>
            <Header />
            <ShopByCategory />
            <Products />
            <RequiredProducts/>
        </div>
    )
}

export default Home
