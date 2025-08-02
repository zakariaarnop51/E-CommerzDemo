import Header from './Header'
import Footer from './Footer';
import Navber from './../Component/navber';
import './Layout.css'

function Layout(props) {
    return (
        <>
            <Header />
            <div className="Body">
                <div className="B-row1">
                    <Navber/>
                </div>
                <div className="B-row2">
                    {props.children}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Layout
