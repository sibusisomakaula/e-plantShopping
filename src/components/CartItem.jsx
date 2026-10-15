import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem, updateQuantity } from '../redux/CartSlice.jsx'

export default function CartItem() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <main className="page">
      <header className="page-heading">
        <h1>Your Shopping Cart</h1>
        <p>{count} {count === 1 ? 'plant' : 'plants'} selected for your home</p>
      </header>
      {items.length === 0 ? (
        <section className="empty-cart">
          <h2>Your cart is waiting for some greenery.</h2>
          <p className="muted">Explore our plant collection and find your new favourite.</p>
          <Link className="button green" to="/plants">Continue Shopping</Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-list">
            {items.map((item) => (
              <article className="cart-card" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Unit price: R{item.price.toFixed(2)}</p>
                  <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
                    <button aria-label="Decrease quantity" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                    <strong>{item.quantity}</strong>
                    <button aria-label="Increase quantity" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                  </div>
                  <button className="button danger" style={{ marginTop: 12, padding: '8px 12px' }} onClick={() => dispatch(removeItem(item.id))}>Delete</button>
                </div>
                <div className="cart-item-total">
                  <p>Subtotal</p>
                  <strong>R{(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              </article>
            ))}
          </section>
          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-line"><span>Items</span><span>{count}</span></div>
            <div className="summary-line"><span>Subtotal</span><span>R{total.toFixed(2)}</span></div>
            <div className="summary-line"><span>Delivery</span><span>Calculated at checkout</span></div>
            <div className="summary-line summary-total"><span>Total</span><span>R{total.toFixed(2)}</span></div>
            <Link className="button light" to="/plants">Continue Shopping</Link>
            <button className="button green" onClick={() => window.alert('Thank you for shopping at Paradise Nursery! Checkout is a demo for this project.')}>Checkout</button>
          </aside>
        </div>
      )}
    </main>
  )
}