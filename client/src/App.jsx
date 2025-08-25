import {BrowserRouter, Route, Routes} from "react-router";
import HomePage from "./Page/HomePage";
import ProductByBrand from "./Page/ProductByBrand";
import ProductByCategory from "./Page/ProductByCategory";
import ProductByKeyword from "./Page/ProductByKeyword";
import ProductByFilter from "./Page/ProductByFilter.jsx";
import Details from "./Page/Details.jsx";
import FooterComponent from "./Component/FooterComponent.jsx";
import Email from "./Component/Email.jsx";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/ProductByBrand/:id" element={<ProductByBrand/>}/>
                    <Route path="/ProductByCategory/:id" element={<ProductByCategory/>}/>
                    <Route path="/ProductByKeyword/:Keyword" element={<ProductByKeyword/>}/>
                    <Route path="/ProductByFilter" element={<ProductByFilter/>}/>
                    <Route path="/about/:id" element={<FooterComponent/>}/>
                    <Route path="/privacy/:id" element={<FooterComponent/>}/>
                    <Route path="/terms/:id" element={<FooterComponent/>}/>
                    <Route path="/howtobuy/:id" element={<FooterComponent/>}/>
                    <Route path="/contact/:id" element={<FooterComponent/>}/>
                    <Route path="/complain/:id" element={<FooterComponent/>}/>
                    <Route path="/Details/:id" element={<Details/>}/>

                    {/* login */}
                    <Route path="/Email" element={<Email/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
