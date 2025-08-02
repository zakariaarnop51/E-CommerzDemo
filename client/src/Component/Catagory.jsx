import React from 'react';
import './ComponentcssCss/Brands.css'
import { ProductStore } from './../Store/ProductStore';
import { Link } from 'react-router-dom';


function Categories() {
    const { CategoryList } = ProductStore();

    if (CategoryList === null) {
        return <div>Loading ..............</div>;
    } else if (!Array.isArray(CategoryList) || CategoryList.length === 0) {
        return <div>Data not available</div>;
    } else {
        return (
            <div className="BrandHeader">
                <div className="BRow1">
                    <h1>Top category</h1>
                    <p>Explore a world of choice across our most popular brands</p>
                </div>
                <div className="BRow2">
                    {CategoryList.map((item, key) => (

                        <div key={key} className="CardBodyC">
                            <Link to={`/ProductByCategory/${item._id}`}>
                                <img className='c-img' src={`https://c8.alamy.com/comp/2E2KAR8/electronic-signature-outline-vector-icon-thin-line-black-electronic-signature-icon-flat-vector-simple-element-illustration-from-editable-electronic-2E2KAR8.jpg`} alt={item['categoryName']} />
                                <p>{item['categoryName']}</p>
                            </Link>
                        </div>

                    ))}
                </div>
            </div>
        );
    }
}

export default Categories;
