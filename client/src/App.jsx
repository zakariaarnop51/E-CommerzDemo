import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./Page/HomePage";
import ProductByBrand from "./Page/ProductByBrand";
import ProductByCategory from "./Page/ProductByCategory";
import ProductByKeyword from "./Page/ProductByKeyword";
import ProductByFilter from "./Page/ProductByFilter.jsx";
import Details from "./Page/Details.jsx";



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ProductByBrand/:id" element={<ProductByBrand />} />
        <Route path="/ProductByCategory/:id" element={<ProductByCategory />} />
        <Route path="/ProductByKeyword/:Keyword" element={<ProductByKeyword />} />
          <Route path="/ProductByFilter" element={<ProductByFilter />} />
          <Route path="/Details/:id" element={<Details/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
