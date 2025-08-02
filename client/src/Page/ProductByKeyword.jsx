import { useEffect } from "react"
import { ProductStore } from "../Store/ProductStore"
import { useParams } from "react-router-dom"
import Layout from "../Layout/Layout"
import ProductList from "../Component/ProductList"
import '../Component/ComponentcssCss/global.css'

function ProductByKeyword() {
  const { KeywordByProductRequest } = ProductStore()
  const { Keyword } = useParams()

  useEffect(() => {
    KeywordByProductRequest(Keyword)
  }, [Keyword])


  return (
    <Layout>
      <div className="ProductList-container">
        <ProductList />
      </div>
    </Layout>
  )
}

export default ProductByKeyword