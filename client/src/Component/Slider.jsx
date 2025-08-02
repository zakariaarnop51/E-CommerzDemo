import { useState } from "react";
import { Link } from 'react-router-dom'
import { ProductStore } from "../Store/ProductStore";
import './ComponentcssCss/Slider.css'

function Slider() {
  const { SliderList } = ProductStore();
  const [count, setCount] = useState(0); // Example of slide index state


  const RightButton = () => {
    setCount((prev) => {
      if (prev < SliderList.length - 1) {
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
        return SliderList.length - 1;
      }
    }); // Example: Decrement slide index
  };
  //const currentSlide = SliderList?.[count] || {};


  if (SliderList === null) {
    return (
      <>
        <div>Loading...</div>
      </>
    )
  } else if (!Array.isArray(SliderList) || SliderList.length === 0) {
    <>
      <div>Failed to load data</div>
    </>
  } else {
    return (
      <div className="Slider-Container">
        <div className="Slider-Header">
          <p className="LeftButton" onClick={LeftButton}><i className="bi bi-chevron-compact-left btn-icon"></i></p>
          <div className="Slider-main">
            <div className="Slider-Left">
              <h1 className="Slider-title">{SliderList[count].title}</h1>
              <p className="Slider-des">{SliderList[count].des}</p>
              <p className="Slider-price">{SliderList[count].price}</p>
              <Link className="Slider-details">view details</Link>
            </div>

            <div className="Slider-Right">
              {/* Display the slide image or other content */}

              <img src={SliderList[count].image} alt={SliderList[count].title} />

            </div>
          </div>
          <p className="RightButton" onClick={RightButton}><i className="bi bi-chevron-compact-right btn-icon"></i></p>
        </div>
        <div className="Slider-footer">
          {
            SliderList.map((_, index) => (
              <div key={index} className="Samble">
                <span  className={` ${count === index ? 'active' : 'inactive'}`} onClick={() => setCount(index)}>{index}</span>

              </div>
            ))
          }
        </div>
      </div>
    );
  }



}

export default Slider;
