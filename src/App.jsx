import { Link, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductList from './components/ProductList.jsx'
import CartItem from './components/CartItem.jsx'
import AboutUs from './components/AboutUs.jsx'

function Navbar() {
  const items = useSelector((state) => state.cart.items)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <header className="navbar">
      <Link className="brand" to="/">🌿 Paradise Nursery</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/about">About Us</Link>
        <Link to="/cart" className="cart-link">🛒 Cart <span>{count}</span></Link>
      </nav>
    </header>
  )
}

function LandingPage() {
  return (
    <main className="landing">
      <div className="landing-shade" />
      <section className="landing-content">
        <p className="eyebrow">BRING NATURE HOME</p>
        <h1>Paradise Nursery</h1>
        <p className="landing-copy">Make your space feel alive with beautiful, easy-to-love houseplants.</p>
        <Link className="primary-button" to="/plants">Get Started <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <footer className="footer">© {new Date().getFullYear()} Paradise Nursery · Grow a little happiness.</footer>
    </div>
  )
}