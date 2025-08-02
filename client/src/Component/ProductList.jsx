
import { ProductStore } from '../Store/ProductStore';
import { Link } from 'react-router-dom';
import './ComponentcssCss/RemarkList.css'

function ProductList() {
  const { ListProduct } = ProductStore();

  if (ListProduct === null) {
    return (
      <div>Loading......</div>
    );
  } else if (!Array.isArray(ListProduct) || ListProduct.length === 0) {
    return (
      <div className="note-Fund">Product not found  404 </div>
    );
  } else {
    return (  // <<< You need to return the mapped JSX here
      <>
        {ListProduct.map((item, i) => {

          let price = <p>{item['price']}</p>
          if (item['discount'] === true) {
            price = <p className='Price'>Price : <strong className='dis-price'>{item['discountPrice']} $</strong> <strike>{item['price']} $</strike></p>
          }

          return (
            <div key={i} className="Remark-Card">
              <Link to={`/Details/${item._id}`} className='Remark-link'>
                <img className='cade-img' src={item['image']} alt={item['title']} />
                <div className="RC-Body">
                  <p className='title'>{item["title"]}</p>
                  {price}
                </div>
                <div className="rating-icon">
                  
                <span>
                    <i className="bi bi-star-fill "></i>
                  </span>
                  <span>
                    <i className="bi bi-star-fill "></i>
                  </span>
                  <span>
                    <i className="bi bi-star-fill "></i>
                  </span>
                  <span>
                    <i className="bi bi-star-fill "></i>
                  </span>
                  <span>
                    <i className="bi bi-star-fill "></i>
                  </span>
                </div>
              </Link>
            </div>
          )
        })}
      </>
    );
  }
}

export default ProductList;
