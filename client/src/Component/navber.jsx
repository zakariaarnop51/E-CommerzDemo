import { useEffect, useState } from 'react'
import { ProductStore } from '../Store/ProductStore'
import './ComponentcssCss/Navber.css'
import {useNavigate} from "react-router-dom";


function Navber() {
    const navigate=useNavigate()
  const { BrandList,FilterList,ListProduct, BrandListRequest, CategoryList, CategoryListRequest,FilterByProductRequest } = ProductStore()
  const [Filter, SetFilter] = useState({ brandID: " ", categoryID: " ", priceMin: " ", priceMax: " " })
  const NChangde = async (name, value) => {
    SetFilter((data) => ({
      ...data,
      [name]: value
    }))
  }


    useEffect(() => {
        if (BrandList === null) BrandListRequest();
        if (CategoryList === null) CategoryListRequest();

        const isFilterValid = Filter.brandID.trim() || Filter.categoryID.trim() || Filter.priceMin.trim() || Filter.priceMax.trim();

        if (isFilterValid) {
            FilterByProductRequest(Filter);
        }

         if (FilterList===true) {
            void navigate('/ProductByFilter')
        }

        console.log(Filter);
        console.log(ListProduct);
        console.log(FilterList);
    }, [Filter,FilterList]);


    return (
    <div className='N-With'>
      <label className='lable' htmlFor="brandID">Brand</label>
      <select value={Filter['brandID']} onChange={(e) => NChangde("brandID", e.target.value)} className='N-select' id="brandID">
        <option className='N-option'>Choose Brand</option>
        {
          BrandList !== null ? (
            BrandList.map((item) => (
              <option key={item._id} value={item._id} className='N-option'>
                {item.brandName}
              </option>
            ))
          ) : (
            <option disabled>Loading brands...</option>
          )
        }
      </select>
      <label className='lable' htmlFor="categoryID">CategoryList</label>
      <select value={Filter.categoryID} onChange={(e) => NChangde("categoryID", e.target.value)} className='N-select' id="categoryID">
        <option className='N-option'>Choose CategoryList</option>
        {
          CategoryList !== null ? (
            CategoryList.map((item) => (
              <option key={item._id} value={item._id} className='N-option'>
                {item.categoryName}
              </option>
            ))
          ) : (
            <option disabled>Loading CategoryList...</option>
          )
        }
      </select>
      <label className='lable' htmlFor="priceMix">Maximum Price</label>
      <input value={Filter.priceMin} onChange={(e) => NChangde("priceMin", e.target.value)} className='N-Price' type='text' id="priceMax" />
      <label className='lable' htmlFor="priceMix">Minimum Price</label>
      <input value={Filter.priceMax} onChange={(e) => NChangde("priceMax", e.target.value)} className='N-Price' type="text" id="priceMix" />
    </div>
  )
}

export default Navber
