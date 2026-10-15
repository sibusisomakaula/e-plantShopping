import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../redux/CartSlice.jsx'
import { plants } from '../data/plants.js'

export default function ProductList() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const categories = [...new Set(plants.map((plant) => plant.category))]

  return (
    <main className="page">
      <header className="page-heading">
        <h1>Find Your Perfect Plant</h1>
        <p>Bring home a little green happiness. Choose a plant to get started.</p>
      </header>
      {categories.map((category) => (
        <section key={category}>
          <h2 className="category">{category}</h2>
          <div className="plant-grid">
            {plants.filter((plant) => plant.category === category).map((plant) => {
              const inCart = cartItems.some((item) => item.id === plant.id)
              return (
                <article className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} loading="lazy" />
                  <div className="plant-info">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <div className="plant-bottom">
                      <span className="price">R{plant.price.toFixed(2)}</span>
                      <button className="button green" onClick={() => dispatch(addItem(plant))}>
                        {inCart ? 'Add Another' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ))}
    </main>
  )
}