import {ProductStore} from "../Store/ProductStore.js";
import {useEffect, useState} from "react";
import  parse from 'html-react-parser';
import './ComponentcssCss/DetailsComponent.css'
import Brands from "./Brands.jsx";
function DetailsComponent() {
    const {DetailsByProduct,BrandListRequest,BrandList} = ProductStore();
    const [count, setCount] = useState(0);
    const [Quantity, setQuantity] = useState(1);
    const [value, setValue] = useState("Specifications");



    useEffect(() => {
        BrandList===null?BrandListRequest():null;

        console.log("DetailsByProduct:", DetailsByProduct);
    }, [DetailsByProduct]);

    if (!DetailsByProduct || DetailsByProduct.length === 0) {
        return <p>Loading...</p>; // Handle loading or no data
    }

    const details = DetailsByProduct[0].details;

    // Filter only image URLs (img1 to img8)
    const imageUrls = Object.entries(details)
        .filter(([key, _]) => key.startsWith("img"))
        .map(([_, value]) => value);

    const RightButton = () => {
        setCount((prev) => {
            if (prev < imageUrls.length - 1) {
                return prev + 1
            } else {
                return 0;
            }
        }); // Example: Increment slide index
    };

    const LeftButton = () => {
        setCount((prev) => {
            if (prev > 0) {
                return prev - 1
            } else {
                return imageUrls.length - 1;
            }
        }); // Example: Decrement slide index
    };

    return (<div>
        <div className="Details-top">
            <div className="Details-top-left">
                <div className="D-Container">
                    <div className="Details-left-imgList">
                        {imageUrls.map((url, i) => (<div className={i === count ? "D-ImgList" : " "} key={i}>
                            <img className="D-imgList" src={url}
                                 alt="product" onClick={() => setCount(i)}/>
                        </div>))}
                    </div>
                    <div className="ImgTop">
                        <p className="D-L-Button" onClick={LeftButton}><i
                            className="bi bi-chevron-compact-left D-icon"></i></p>
                        <img className='D-img' src={imageUrls[count]} alt="product"/>
                        <p className="D-R-Button" onClick={RightButton}><i
                            className="bi bi-chevron-compact-right D-icon"></i></p>
                    </div>
                </div>

            </div>
            <div className="Details-top-Right">
                <div className="Details-top-Right-title">
                    <h1 className="D-title">{DetailsByProduct[0].title}</h1>
                    <p className="D-Category">Category:- {DetailsByProduct[0]['category']['categoryName']}</p>
                    <p className="D-Brand">Brand:- {DetailsByProduct[0]['brand']['brandName']}</p>
                    <p className="D-shortDes">{DetailsByProduct[0]['shortDes']}</p>

                    {DetailsByProduct[0]['discount'] ? <span className="D-price">
                    <strike
                        className=" dis-Price">{DetailsByProduct[0]['price']}</strike> {DetailsByProduct[0]['discountPrice']}</span> :
                        <span className='dis-Price'>Taka:{DetailsByProduct[0]['price']}</span>}

                </div>
                <div className='D-input'>
                    <div >
                        <label className=' D-label'>Size</label><br/>
                        <select className="D-input-size">
                            <option value="">Size</option>
                            {DetailsByProduct[0]['details']['size'].split(',').map((item, i) => {
                                return <option key={i} value={item.trim()}>{item.trim()}</option>;
                            })}
                        </select>
                    </div>
                    <div>
                        <label className=' D-label'>color</label><br/>
                        <select className="D-input-size">
                            <option value="">color</option>
                            {DetailsByProduct[0]['details']['color'].split(',').map((item, i) => {
                                return <option key={i} value={item.trim()}>{item.trim()}</option>;
                            })}
                        </select>
                    </div>
                    <div>
                        <label className=' D-label'>Quantity</label><br/>
                        <button className="D-btn" onClick={() => setQuantity(Quantity - 1)}>-</button>
                        <input className="D-input-size" value={Quantity} type={'text'} onChange={(e) => setQuantity(e.target.value)}/>
                        <button className="D-btn" onClick={() => setQuantity(Quantity + 1)}>+</button>
                    </div>
                </div>
                <div className="D-btn-add">
                    <button className="D-btn-add-btn">Add to Cart</button>
                    <button className="D-btn-add-btn">Buy Now</button>
                </div>
            </div>
        </div>
        <div className='D-Bottom'>
            <div className="D-Bottom-title">
                <span className={value==="Specifications"?"Specifications-ActiveBtn":"Specifications-unActiveBtn"} onClick={()=> setValue("Specifications")}>Specifications</span>
                <span className={value==="Review"?"Specifications-ActiveBtn":"Specifications-unActiveBtn"} onClick={()=> setValue("Review")}>Review</span>
            </div>
            <div className={value==="Specifications"?"D-Active":"D-unActive"}>{parse(DetailsByProduct[0]['details']['des'])}</div>
            <div className={value==="Review"?"D-Active":"D-unActive"} >this is Review</div>
        </div>
        <Brands/>
    </div>);
}

export default DetailsComponent;
