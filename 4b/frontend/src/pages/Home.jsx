import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>The Royal Plate</h1>
          <p>Experience exquisite dining with our carefully curated menu featuring the finest ingredients and culinary mastery.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/menu" className="btn btn-primary">View Menu</Link>
            <Link to="/reservations" className="btn btn-secondary">Book a Table</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">We take pride in delivering exceptional dining experiences</p>
          
          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon">🍽️</div>
              <h3>Fresh Ingredients</h3>
              <p>We source only the freshest, locally-sourced ingredients to ensure every dish is of the highest quality.</p>
            </div>
            
            <div className="feature-card card">
              <div className="feature-icon">👨‍🍳</div>
              <h3>Expert Chefs</h3>
              <p>Our team of world-class chefs brings creativity and passion to every plate they create.</p>
            </div>
            
            <div className="feature-card card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Enjoy our delicious meals at home with our quick and reliable online ordering service.</p>
            </div>
            
            <div className="feature-card card">
              <div className="feature-icon">🎉</div>
              <h3>Perfect Ambiance</h3>
              <p>Whether it's a romantic dinner or a family gathering, our atmosphere sets the perfect mood.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 20px', backgroundColor: '#2c3e50', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Ready to Order?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Browse our menu and place your order for delivery or pickup. Fresh food, delivered fast.
          </p>
          <Link to="/order" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '16px 32px' }}>
            Order Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
