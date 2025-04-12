import { useState } from 'react';
import './Settings.css'
const Settings = () => {
  const [storeInfo, setStoreInfo] = useState({
    name: 'Furniture Haven',
    email: 'info@furniturehaven.com',
    phone: '+1 (555) 123-4567',
    address: '123 Furniture St, Design City, DC 12345',
    description: 'Premium furniture for modern living'
  });

  const [shippingSettings, setShippingSettings] = useState({
    standardCost: 9.99,
    expressCost: 19.99,
    freeThreshold: 299,
    processingTime: '1-2 business days'
  });

  const [taxSettings, setTaxSettings] = useState({
    enabled: true,
    rate: 7.5,
    taxIncluded: false
  });

  const handleStoreInfoChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleTaxChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaxSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = (section) => {
    // In a real app, would send to API
    console.log(`${section} settings saved`);
    alert(`${section} settings saved successfully!`);
  };

  return (
    <div className="settings">
      <h2>Store Settings</h2>
      
      <div className="settings-grid">
        <div className="settings-card">
          <h3>Store Information</h3>
          <form>
            <div className="form-group">
              <label>Store Name</label>
              <input 
                type="text" 
                name="name" 
                value={storeInfo.name} 
                onChange={handleStoreInfoChange}
              />
            </div>
            <div className="form-group">
              <label>Store Email</label>
              <input 
                type="email" 
                name="email" 
                value={storeInfo.email} 
                onChange={handleStoreInfoChange}
              />
            </div>
            <div className="form-group">
              <label>Store Phone</label>
              <input 
                type="tel" 
                name="phone" 
                value={storeInfo.phone} 
                onChange={handleStoreInfoChange}
              />
            </div>
            <div className="form-group">
              <label>Store Address</label>
              <textarea 
                name="address" 
                value={storeInfo.address} 
                onChange={handleStoreInfoChange}
              />
            </div>
            <div className="form-group">
              <label>Store Description</label>
              <textarea 
                name="description" 
                value={storeInfo.description} 
                onChange={handleStoreInfoChange}
              />
            </div>
            <button 
              type="button" 
              className="btn-primary"
              onClick={() => handleSaveSettings('Store Information')}
            >
              Save Store Info
            </button>
          </form>
        </div>

        <div className="settings-card">
          <h3>Shipping Settings</h3>
          <form>
            <div className="form-group">
              <label>Standard Shipping Cost ($)</label>
              <input 
                type="number" 
                name="standardCost" 
                value={shippingSettings.standardCost} 
                onChange={handleShippingChange}
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Express Shipping Cost ($)</label>
              <input 
                type="number" 
                name="expressCost" 
                value={shippingSettings.expressCost} 
                onChange={handleShippingChange}
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Free Shipping Threshold ($)</label>
              <input 
                type="number" 
                name="freeThreshold" 
                value={shippingSettings.freeThreshold} 
                onChange={handleShippingChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Order Processing Time</label>
              <input 
                type="text" 
                name="processingTime" 
                value={shippingSettings.processingTime} 
                onChange={handleShippingChange}
                placeholder="e.g. 1-2 business days"
              />
            </div>
            <button 
              type="button" 
              className="btn-primary"
              onClick={() => handleSaveSettings('Shipping')}
            >
              Save Shipping Settings
            </button>
          </form>
        </div>

        <div className="settings-card">
          <h3>Tax Settings</h3>
          <form>
            <div className="form-group checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  name="enabled" 
                  checked={taxSettings.enabled} 
                  onChange={handleTaxChange}
                />
                Enable Taxes
              </label>
            </div>
            <div className="form-group">
              <label>Tax Rate (%)</label>
              <input 
                type="number" 
                name="rate" 
                value={taxSettings.rate} 
                onChange={handleTaxChange}
                min="0"
                max="30"
                step="0.1"
                disabled={!taxSettings.enabled}
              />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  name="taxIncluded" 
                  checked={taxSettings.taxIncluded} 
                  onChange={handleTaxChange}
                  disabled={!taxSettings.enabled}
                />
                Prices Include Tax
              </label>
            </div>
            <button 
              type="button" 
              className="btn-primary"
              onClick={() => handleSaveSettings('Tax')}
            >
              Save Tax Settings
            </button>
          </form>
        </div>

        <div className="settings-card">
          <h3>Payment Methods</h3>
          <div className="payment-methods">
            <div className="payment-method">
              <h4>Credit/Debit Cards</h4>
              <p>Accept Visa, Mastercard, American Express</p>
              <button className="btn-edit">Configure</button>
            </div>
            <div className="payment-method">
              <h4>PayPal</h4>
              <p>Accept payments via PayPal</p>
              <button className="btn-edit">Configure</button>
            </div>
            <div className="payment-method">
              <h4>Bank Transfer</h4>
              <p>Direct bank transfers</p>
              <button className="btn-edit">Configure</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

