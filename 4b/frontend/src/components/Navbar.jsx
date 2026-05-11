import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path ? 'active' : ''
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          The Royal Plate
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          </li>
          <li>
            <Link to="/menu" className={`nav-link ${isActive('/menu')}`}>Menu</Link>
          </li>
          <li>
            <Link to="/reservations" className={`nav-link ${isActive('/reservations')}`}>Reservations</Link>
          </li>
          <li>
            <Link to="/order" className={`nav-link ${isActive('/order')}`}>Order Online</Link>
          </li>
          <li>
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
