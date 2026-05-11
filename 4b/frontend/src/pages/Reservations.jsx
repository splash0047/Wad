import { useState } from 'react'

const API_URL = '/api'

function Reservations() {
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    reservation_date: '',
    reservation_time: '',
    guests: 2
  })
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Reservation created successfully! We will confirm shortly.')
        setFormData({
          customer_name: '',
          email: '',
          phone: '',
          reservation_date: '',
          reservation_time: '',
          guests: 2
        })
      } else {
        setError(data.error || 'Failed to create reservation')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }

  return (
    <div className="reservations-page">
      <div className="container">
        <h2 className="section-title">Book a Table</h2>
        <p className="section-subtitle">Reserve your spot for an unforgettable dining experience</p>

        {message && <div className="success-msg">{message}</div>}
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit} className="card" style={{ marginTop: '32px' }}>
          <div className="form-group">
            <label htmlFor="customer_name">Full Name *</label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label htmlFor="reservation_date">Date *</label>
              <input
                type="date"
                id="reservation_date"
                name="reservation_date"
                value={formData.reservation_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reservation_time">Time *</label>
              <input
                type="time"
                id="reservation_time"
                name="reservation_time"
                value={formData.reservation_time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guests">Number of Guests *</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
            >
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Book Reservation
          </button>
        </form>
      </div>
    </div>
  )
}

export default Reservations
