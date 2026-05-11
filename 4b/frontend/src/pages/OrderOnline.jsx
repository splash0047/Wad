import { useState, useEffect } from 'react'

const API_URL = '/api'

function OrderOnline() {
  const [menuItems, setMenuItems] = useState([])
  const [cart, setCart] = useState([])
  const [categories, setCategories] = useState(['all'])
  const [activeCategory, setActiveCategory] = useState('all')
  const [showCheckout, setShowCheckout] = useState(false)
  
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMenuItems()
    fetchCategories()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`${API_URL}/menu`)
      const data = await response.json()
      setMenuItems(data)
    } catch (error) {
      console.error('Error fetching menu:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/menu/categories`)
      const data = await response.json()
      setCategories(['all', ...data])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.menu_item_id === item.id)
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.menu_item_id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { 
        menu_item_id: item.id, 
        name: item.name, 
        price: item.price, 
        quantity: 1 
      }])
    }
  }

  const updateQuantity = (itemId, delta) => {
    setCart(cart.map(item => {
      if (item.menu_item_id === itemId) {
        const newQuantity = item.quantity + delta
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.menu_item_id !== itemId))
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    if (cart.length === 0) {
      setError('Your cart is empty')
      return
    }

    try {
      const orderData = {
        ...formData,
        items: cart.map(item => ({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          price: item.price
        })),
        total_amount: cartTotal
      }

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`Order placed successfully! Your order ID is #${data.id}`)
        setCart([])
        setFormData({ customer_name: '', email: '', phone: '', address: '' })
        setShowCheckout(false)
      } else {
        setError(data.error || 'Failed to place order')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  const getCategoryEmoji = (category) => {
    const emojis = {
      'Pizza': '🍕', 'Burgers': '🍔', 'Salads': '🥗',
      'Pasta': '🍝', 'Desserts': '🍰', 'Beverages': '🥤'
    }
    return emojis[category] || '🍽️'
  }

  return (
    <div className="order-page">
      <div className="container">
        <h2 className="section-title">Order Online</h2>
        <p className="section-subtitle">Browse our menu and order for delivery</p>

        {message && <div className="success-msg">{message}</div>}
        {error && <div className="error-msg">{error}</div>}

        {/* Cart Section */}
        {cart.length > 0 && (
          <div className="cart-section">
            <h3 style={{ marginBottom: '16px', color: '#2c3e50' }}>Your Order</h3>
            {cart.map(item => (
              <div key={item.menu_item_id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                    Rs. {item.price} x {item.quantity}
                  </div>
                </div>
                <div className="quantity-control">
                  <button className="qty-btn" onClick={() => updateQuantity(item.menu_item_id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.menu_item_id, 1)}>+</button>
                  <button 
                    onClick={() => removeFromCart(item.menu_item_id)}
                    style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', marginLeft: '8px' }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            <div className="cart-total">
              Total: Rs. {cartTotal.toFixed(2)}
            </div>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '16px' }}
              onClick={() => setShowCheckout(!showCheckout)}
            >
              {showCheckout ? 'Hide Checkout' : 'Proceed to Checkout'}
            </button>
          </div>
        )}

        {/* Checkout Form */}
        {showCheckout && (
          <form onSubmit={handleSubmit} className="card">
            <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Delivery Details</h3>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={formData.customer_name}
                onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea
                rows="3"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Place Order (Rs. {cartTotal.toFixed(2)})
            </button>
          </form>
        )}

        {/* Menu Items */}
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'all' ? 'All Items' : category}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-item">
              <div className="menu-item-image">
                <span>{getCategoryEmoji(item.category)}</span>
              </div>
              <div className="menu-item-content">
                <div className="menu-item-header">
                  <h3>{item.name}</h3>
                  <span className="menu-item-price">Rs. {item.price}</span>
                </div>
                <p className="menu-item-desc">{item.description}</p>
                <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderOnline
