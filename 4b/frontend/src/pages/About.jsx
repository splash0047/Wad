function About() {
  return (
    <div className="about-page">
      <div className="container">
        <h2 className="section-title">About The Royal Plate</h2>
        <p className="section-subtitle">Our story, our passion, our commitment to excellence</p>
        
        <div className="about-content">
          <div className="card">
            <h3 style={{ color: '#e67e22', marginBottom: '16px' }}>Our Story</h3>
            <p>
              Founded in 2015, The Royal Plate began with a simple mission: to bring exceptional dining 
              experiences to our community. What started as a small family restaurant has grown into 
              one of the most beloved dining destinations in the city.
            </p>
            <p>
              Our founder, Chef Michael Roberts, believed that great food should be accessible to everyone. 
              With over 20 years of culinary experience across Europe and Asia, he crafted a menu that 
              celebrates both local flavors and international cuisine.
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: '#e67e22', marginBottom: '16px' }}>Our Philosophy</h3>
            <p>
              At The Royal Plate, we believe that dining is more than just eating – it's an experience. 
              From the moment you walk through our doors, we want you to feel welcomed, valued, and 
              excited about the culinary journey ahead.
            </p>
            <p>
              We are committed to sustainability and source our ingredients from local farmers and 
              suppliers whenever possible. Our menu changes seasonally to ensure we're always serving 
              the freshest, most flavorful dishes.
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: '#e67e22', marginBottom: '16px' }}>Visit Us</h3>
            <p>
              <strong>Address:</strong> 123 Culinary Avenue, Food District, City Center
            </p>
            <p>
              <strong>Hours:</strong> Monday - Sunday, 11:00 AM - 11:00 PM
            </p>
            <p>
              <strong>Contact:</strong> +91 98765 43210 | info@royalplate.com
            </p>
          </div>
        </div>

        <div className="features-grid" style={{ marginTop: '40px' }}>
          <div className="feature-card card">
            <h3 style={{ color: '#2c3e50', marginBottom: '8px' }}>500+</h3>
            <p>Happy Customers Daily</p>
          </div>
          <div className="feature-card card">
            <h3 style={{ color: '#2c3e50', marginBottom: '8px' }}>50+</h3>
            <p>Menu Items</p>
          </div>
          <div className="feature-card card">
            <h3 style={{ color: '#2c3e50', marginBottom: '8px' }}>15</h3>
            <p>Expert Chefs</p>
          </div>
          <div className="feature-card card">
            <h3 style={{ color: '#2c3e50', marginBottom: '8px' }}>4.8</h3>
            <p>Customer Rating</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
