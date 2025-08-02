import { useEffect } from "react"
import { ProductStore } from "../Store/ProductStore"
import { useParams } from "react-router-dom"
import Layout from "../Layout/Layout"
import ProductList from "../Component/ProductList"
import '../Component/ComponentcssCss/global.css'

function ProductByBrand() {
    const {BrandByProductRequest}=ProductStore()
    const{id}=useParams()

    useEffect(()=>{
        BrandByProductRequest(id)        
    },[id])


  return (
   <Layout>
    <div className="ProductList-container">
    <ProductList/>

    </div>
   </Layout>
  )
}

export default ProductByBrand
