import Layout from "../Layout/Layout"
import ProductList from "../Component/ProductList"
import '../Component/ComponentcssCss/global.css'
import {ProductStore} from "../Store/ProductStore.js";
import {useEffect} from "react";

function ProductByFilter() {
    const {FilterListRequest } = ProductStore()
    useEffect(() => {
        (async () => {
            await FilterListRequest();
        })();
    }, []);

    return (
        <Layout>
            <div className="ProductList-container">
                <ProductList />
            </div>
        </Layout>
    )
}

export default ProductByFilter