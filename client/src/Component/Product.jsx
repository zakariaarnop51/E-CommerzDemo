import { ProductStore } from '../Store/ProductStore';
import RemarkList from './RemarkList'; // small fix: make sure your filename is correctly cased
import "./ComponentcssCss/Product.css"
function Product() {
  const { CssRemark,ProductRemarkRequest } = ProductStore();

  

  return (
    <div>
      <div className="Product-title">
        <h1>Our Products</h1>
        <p>Explore a World of Choices Across Our Most Popular</p>
      </div>

      <div className="Product-type">
        <p className={CssRemark === "new" ? "new-Productbg":"new-Product"} onClick={() => ProductRemarkRequest("new")}>New</p>
        <p className={CssRemark === "trending" ? "new-Productbg":"new-Product"} onClick={() => ProductRemarkRequest("trending")}>Trending</p>
        <p className={CssRemark === "popular" ? "new-Productbg":"new-Product"} onClick={() => ProductRemarkRequest("popular")}>Popular</p>
        <p className={CssRemark === "top" ? "new-Productbg":"new-Product"} onClick={() => ProductRemarkRequest("top")}>Top</p>
        <p className={CssRemark === "special" ? "new-Productbg":"new-Product"} onClick={() => ProductRemarkRequest("special")}>Special</p> 
      </div>

      <div className='Remark-list'>
        <RemarkList />
      </div>
    </div>
  );
}

export default Product;
