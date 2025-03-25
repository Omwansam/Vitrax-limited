import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { FiFilter } from "react-icons/fi";
import Sofa from '../../assets/Sofa.png'
import Dining from '../../assets/Dining.png'
import BarTable from '../../assets/BarTable.png'
import Console from '../../assets/Console.png'
import "./FurntureGrid.css";


const products = [
    { id: 1, name: "Trenton modular sofa", price: 25000, image: Sofa, },
    { id: 2, name: "Granite dining table", price: 25000, image: Dining,},
    { id: 3, name: "Outdoor bar table", price: 25000, image: BarTable, },
    { id: 4, name: "Plain console table", price: 25000, image: Console, },
    { id: 5, name: "Grain coffee table", price: 15000, image: "coffee1.jpg" },
    { id: 6, name: "Kent coffee table", price: 225000, image: "coffee2.jpg" },
    { id: 7, name: "Round coffee table", price: 25000, image: "coffee3.jpg" },
    { id: 8, name: "Reclaimed teak coffee", price: 25000, image: "coffee4.jpg" },
    { id: 9, name: "Reclaimed teak Sideboard", price: 20000, image: "sideboard.jpg" },
    { id: 10, name: "SUP_set", price: 200000, image: "sup-set.jpg" },
    { id: 11, name: "Belle chair set", price: 244000, image: "belle.jpg" },
    { id: 12, name: "Granite square table", price: 258200, image: "square-table.jpg" },
    { id: 13, name: "Angsana sofa", price: 250000, image: "angsana.jpg" },
    { id: 14, name: "Maya white three-seater", price: 115000, image: "maya.jpg" },
    { id: 15, name: "Outdoor sofa set", price: 100000, image: "outdoor.jpg" },
    { id: 16, name: "Outdoor sofa set", price: 100000, image: "outdoor.jpg" },
  ];



const FurnitureGrid = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [sortOrder, setSortOrder] = useState("default");

    const sortedProducts = [...products].sort((a,b) => {
        if (sortOrder === "priceLowToHigh") return a.price - b.price;
        if (sortOrder === "priceHighToLow") return b.price - a.price;
        return 0; 
    })

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };


    const handleSortChange = (e) => setSortOrder(e.target.value);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);


  return (
    <section className='furnitures-section'>
        <div className='furnitures-container'>
            {/**Filter & Sort Bar */}
            <div className='filter-bar'>
                <button className='filter-btn'>
                    <FiFilter className='filter-icon' />
                </button>
                <span>Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, sortedProducts.length)} of {sortedProducts.length} results</span>

                <label>
                    Show
                    <input type="number" value={itemsPerPage} onChange={handleItemsPerPageChange} min="1" max="16" />
                </label>

                <label>
                    Sort by
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option value="default">Default</option>
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                    </select>
                </label>
            </div>

            {/** Product Grid */}
            <div className='products-grid'>
                {displayedProducts.map((product) => (
                    <div key={product.id} className='products-card'>
                        <Link to={`/product/${product.id}`}>
                            <img src={product.image} alt={product.name}/>
                            <h3>{product.name}</h3>
                            <p>Rs. {product.price.toLocaleString()}</p>
                        </Link>
                    </div>
                ))}
            </div>

            {/**Pagination */}
            <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={currentPage ===index + 1 ? "active" : ""}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    </section>
  )
}

export default FurnitureGrid
