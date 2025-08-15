import {Link} from 'react-router-dom';
import './Footer.css'

function Footer() {
    return (
        <>
            <div className="container-xl container-xxl bg-dark text-white">
                <div className="row">
                    <div className="col-lg-4">
                        <h5>Legals</h5>
                        <Link to={`/about/${'about'}`}>About Us</Link><br/>
                        <Link to={`/privacy/${'privacy'}`}>Return Policy</Link><br/>
                        <Link to={`/terms/${'terms'}`}>Terms & Conditions</Link><br/>
                    </div>
                    <div className="col-lg-4">
                        <h5>Information</h5>
                        <Link to={`/howtobuy/${'howtobuy'}`}>How to buy</Link><br/>
                        <Link to={`/contact/${'contact'}`}>Contact</Link><br/>
                        <Link to={`/complain/${'complain'}`}>Complaint</Link><br/>
                    </div>
                    <div className="col-lg-4">
                        <h5>About</h5>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur, delectus.</p>
                        <div className="social-icons">
                            <img className="bank-icon"
                                 src="https://www.drupal.org/files/styles/grid-4-2x/public/pp-255.png?itok=LCqTOnx2"
                                 alt="Paypal"/>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
