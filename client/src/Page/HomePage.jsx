import { useEffect } from 'react'
import Layout from '../Layout/Layout'
import Slider from '../Component/Slider'
import { ProductStore } from './../Store/ProductStore';
import { FeatureStore } from '../Store/FeatureStore';
import Feature from '../Component/Feature';
import Brands from '../Component/Brands';
import Categories from '../Component/Catagory';
import Product from '../Component/Product';


function HomePage() { 
    const { FeatureRequest } = FeatureStore()
    const { SliderRequest, BrandListRequest, CategoryListRequest,ProductRemarkRequest } = ProductStore()


    useEffect(() => {
        // Fetching data on page load
        SliderRequest();           // Fetch Slider List
        FeatureRequest();          // Fetch Featured Product List
        BrandListRequest();        // Fetch Brand List
        CategoryListRequest();     // Fetch Category List
        ProductRemarkRequest('new'); // Fetch Products by Remark "new"
      }, []);
    return (

        <>
            <Layout>
                <Slider />
                <Feature/>
                <Brands/>
                <Product/>
                <Categories/>
            </Layout>
        </>
    )
}

export default HomePage
