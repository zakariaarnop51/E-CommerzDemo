import React from 'react';
import { ProductStore } from '../Store/ProductStore';
import './ComponentcssCss/Brands.css'
import { Link } from 'react-router-dom';

function Brands() {
    const { BrandList } = ProductStore();

    if (BrandList === null) {
        return <div>Loading ..............</div>;
    } else if (!Array.isArray(BrandList) || BrandList.length === 0) {
        return <div>Data not available</div>;
    } else {
        return (
            <div className="BrandHeader"> 
                <div className="BRow1">
                    <h1>Top Brands</h1>
                    <p>Explore a world of choice across our most popular brands</p>
                </div>
                <div  className="BRow2">
                {BrandList.map((item, key) => (
                    
                        <div key={key} className="CardBody">
                            <Link to={`/ProductByBrand/${item._id}`}>
                            <img className='B-img'  src={item.brandImg} alt='w' />
                            <p>{item.brandName}</p>
                            </Link>
                        </div>
                    
                ))}
                </div>
            </div>
        );
    }
}

export default Brands;
 