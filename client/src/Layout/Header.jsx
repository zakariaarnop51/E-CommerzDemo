import { ProductStore } from '../Store/ProductStore';
import './Header.css'
import { Link } from 'react-router-dom';

function Header() {

  const{Keyword,setKeyword}=ProductStore()
  

  return (

    <div className='Header-main'>
      <div className="Header-contact">
        <div className="Header-text">
          <a className='Header-textContest'><i className="bi bi-envelope-fill"></i> zakariaarnop51@gmai.com</a>
          <a className='Header-textContest'><i className="bi bi-telephone-fill"></i> 01743567806</a>

        </div>
        <div className="Header-icon">
          <a href="#"><i className="bi bi-facebook"></i></a>
          <a href="#"><i className="bi bi-twitter"></i></a>
          <a href="#"><i className="bi bi-instagram"></i></a>
        </div>
      </div>
      <div className="Header-navber">
        <div className="Header-logo">
          <img src="https://cdn.pixabay.com/photo/2017/03/19/20/19/ball-2157465_960_720.png" alt="" />
        </div>
        <div className="Header-menu">
          <Link to="/"> Home</Link>
        </div>
        <div className="Header-search">
          <input onChange={(e)=>{setKeyword(e.target.value)}} type="text" placeholder="Search..." />
          <Link to={Keyword.trim() ? `/ProductByKeyword/${Keyword}` : '/'}><i className="bi bi-search"></i></Link>
        </div>
        <div className="Header-cart">
          <Link to="#"><i className="bi bi-cart3"></i> Cart</Link>
        </div>
        <div className="Header-WistList">
          <Link to="#"><i className="bi bi-heart-fill"></i></Link>
        </div>
        <div className="Header-login">
          <Link to="/Email">Login</Link>
        </div>

      </div>
    </div>
  )
}

export default Header
