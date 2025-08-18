import React, { useState } from 'react'
import { FaMapMarkerAlt, FaTruck, FaCreditCard, FaBuilding, FaPhone, FaClock } from 'react-icons/fa'
import styles from './SupplierInformation.module.scss'

export default function SupplierInformation({ supplier }) {
  const [activeTab, setActiveTab] = useState('about')

  const tabs = [
    { id: 'about', label: 'About the company' },
    { id: 'address', label: 'Address' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'payment', label: 'Payment' }
  ]

  const renderAboutTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.companyInfo}>
        <h3>Company Information</h3>
        <p>{supplier.description}</p>
        
        <div className={styles.companyDetails}>
          <div className={styles.detailItem}>
            <FaBuilding className={styles.icon} />
            <div>
              <strong>Company Name:</strong>
              <span>{supplier.name}</span>
            </div>
          </div>
          
          <div className={styles.detailItem}>
            <FaClock className={styles.icon} />
            <div>
              <strong>Member Since:</strong>
              <span>{supplier.joinDate}</span>
            </div>
          </div>
          
          <div className={styles.detailItem}>
            <FaPhone className={styles.icon} />
            <div>
              <strong>Contact:</strong>
              <span>{supplier.contact}</span>
            </div>
          </div>
          
          <div className={styles.detailItem}>
            <div className={styles.icon}>🌐</div>
            <div>
              <strong>Website:</strong>
              <span>{supplier.website}</span>
            </div>
          </div>
        </div>

        <div className={styles.specialties}>
          <h4>Specialties</h4>
          <div className={styles.specialtyTags}>
            {supplier.specialties.map((specialty, index) => (
              <span key={index} className={styles.specialtyTag}>
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const handleViewOnMap = () => {
    const encodedLocation = encodeURIComponent(supplier.location)
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`
    window.open(mapsUrl, '_blank')
  }

  const renderAddressTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.addressInfo}>
        <div className={styles.addressDetails}>
          <h3>Store Location</h3>
          <div className={styles.address}>
            <FaMapMarkerAlt className={styles.mapIcon} />
            <div>
              <p className={styles.addressText}>{supplier.location}</p>
              <p className={styles.hours}>Closed until 10:00</p>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.phoneBtn}>Show phone number</button>
            <button className={styles.mapBtn} onClick={handleViewOnMap}>
              <FaMapMarkerAlt className={styles.btnIcon} />
              View on map
            </button>
          </div>
        </div>
        
        <div className={styles.mapContainer}>
          <div className={styles.mapHeader}>
            <h4>Interactive Map</h4>
            <span className={styles.mapSubtitle}>Click to explore the area</span>
          </div>
          <div className={styles.mapPlaceholder}>
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(supplier.location)}&zoom=15&maptype=roadmap`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location Map"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderDeliveryTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.deliveryInfo}>
        <h3>Delivery Information</h3>
        
        <div className={styles.deliveryOptions}>
          <div className={styles.deliveryOption}>
            <FaTruck className={styles.icon} />
            <div>
              <h4>Standard Delivery</h4>
              <p>{supplier.delivery}</p>
              <span className={styles.deliveryTime}>2-3 business days</span>
            </div>
          </div>
          
          <div className={styles.deliveryOption}>
            <FaTruck className={styles.icon} />
            <div>
              <h4>Express Delivery</h4>
              <p>Same day delivery available</p>
              <span className={styles.deliveryTime}>Within 4 hours</span>
            </div>
          </div>
        </div>

        <div className={styles.deliveryDetails}>
          <h4>Delivery Areas</h4>
          <ul>
            <li>Rostov region - Free delivery</li>
            <li>Krasnodar region - 500₽ delivery fee</li>
            <li>Other regions - Contact for pricing</li>
          </ul>
        </div>
      </div>
    </div>
  )

  const renderPaymentTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.paymentInfo}>
        <h3>Payment Methods</h3>
        
        <div className={styles.paymentMethods}>
          <div className={styles.paymentMethod}>
            <FaCreditCard className={styles.icon} />
            <div>
              <h4>Credit/Debit Cards</h4>
              <p>Visa, Mastercard, MIR</p>
            </div>
          </div>
          
          <div className={styles.paymentMethod}>
            <div className={styles.icon}>💳</div>
            <div>
              <h4>Bank Transfer</h4>
              <p>Direct bank transfer available</p>
            </div>
          </div>
          
          <div className={styles.paymentMethod}>
            <div className={styles.icon}>💰</div>
            <div>
              <h4>Cash on Delivery</h4>
              <p>Pay when you receive your order</p>
            </div>
          </div>
        </div>

        <div className={styles.returnPolicy}>
          <h4>Return Policy</h4>
          <p>{supplier.returnPolicy}</p>
          <ul>
            <li>Items must be in original condition</li>
            <li>Original packaging required</li>
            <li>Return shipping costs covered by seller</li>
          </ul>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return renderAboutTab()
      case 'address':
        return renderAddressTab()
      case 'delivery':
        return renderDeliveryTab()
      case 'payment':
        return renderPaymentTab()
      default:
        return renderAboutTab()
    }
  }

  return (
    <div className={styles.informationSection}>
      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className={styles.tabContentContainer}>
        {renderTabContent()}
      </div>
    </div>
  )
}
