import React from 'react'
import Featured1 from '../../assets/Featured1.png'
import Featured2 from '../../assets/Featured2.png'
import './FeaturedProducts.css'


const products  = [
    {
        name: "Side table",
        image: Featured1,
    },

    {
        name: "Side table", 
        image: Featured2,
    },
]

const FeaturedProducts = () => {
  return (
    <section className='featured-products'>
        <div className='featured-container'>
            {products.map((product, index) => (
                <div key={index} className='product-card'>
                    <img src={product.image} alt={product.name}/>
                    <h3>{product.name}</h3>
                    <p className='view-more'>View More</p>
                </div>
            ))}
        </div>
    </section>
  )
}

export default FeaturedProducts
