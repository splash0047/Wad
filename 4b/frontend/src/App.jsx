import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservations from './pages/Reservations'
import OrderOnline from './pages/OrderOnline'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/order" element={<OrderOnline />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 The Royal Plate Restaurant. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
