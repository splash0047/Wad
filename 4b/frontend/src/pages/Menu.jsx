import { useState, useEffect } from 'react'

const API_URL = '/api'

function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState(['all'])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMenuItems()
    fetchCategories()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`${API_URL}/menu`)
      const data = await response.json()
      setMenuItems(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching menu:', error)
      setLoading(false)
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

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  const getCategoryEmoji = (category) => {
    const emojis = {
      'Pizza': '🍕',
      'Burgers': '🍔',
      'Salads': '🥗',
      'Pasta': '🍝',
      'Desserts': '🍰',
      'Beverages': '🥤'
    }
    return emojis[category] || '🍽️'
  }

  if (loading) {
    return (
      <div className="menu-page" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>Loading menu...</h2>
      </div>
    )
  }

  return (
    <div className="menu-page">
      <div className="container">
        <h2 className="section-title">Our Menu</h2>
        <p className="section-subtitle">Discover our delicious offerings</p>

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
                <span style={{ 
                  display: 'inline-block', 
                  padding: '4px 12px', 
                  background: '#f0f0f0', 
                  borderRadius: '12px', 
                  fontSize: '0.9rem',
                  color: '#666',
                  marginBottom: '12px'
                }}>
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Menu
