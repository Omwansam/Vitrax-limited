import React, { useState } from "react";
import { FaUser, FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import "./BillingForm.css";

const BillingForm = () => {
  const [country, setCountry] = useState("Sri Lanka");
  const [province, setProvince] = useState("Western Province");

  const countries = ["Sri Lanka", "United States", "United Kingdom", "India", "Australia"];
  const provinces = ["Western Province", "Eastern Province", "Central Province", "Northern Province"];

  return (
    <div className="billing-container">
      <h2>Billing details</h2>

      <div className="form-grid">
        <div className="input-group">
          <FaUser className="icon" />
          <input type="text" placeholder="First Name" />
        </div>
        <div className="input-group">
          <FaUser className="icon" />
          <input type="text" placeholder="Last Name" />
        </div>
      </div>

      <div className="input-group">
        <FaBuilding className="icon" />
        <input type="text" placeholder="Company Name (Optional)" />
      </div>

      <div className="input-group">
        <FaMapMarkerAlt className="icon" />
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          {countries.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <FaMapMarkerAlt className="icon" />
        <input type="text" placeholder="Street address" />
      </div>

      <div className="input-group">
        <FaMapMarkerAlt className="icon" />
        <input type="text" placeholder="Town / City" />
      </div>

      <div className="input-group">
        <FaMapMarkerAlt className="icon" />
        <select value={province} onChange={(e) => setProvince(e.target.value)}>
          {provinces.map((p, index) => (
            <option key={index} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <FaMapMarkerAlt className="icon" />
        <input type="text" placeholder="ZIP code" />
      </div>

      <div className="input-group">
        <FaPhone className="icon" />
        <input type="text" placeholder="Phone" />
      </div>

      <div className="input-group">
        <FaEnvelope className="icon" />
        <input type="email" placeholder="Email address" />
      </div>

      <textarea placeholder="Additional Information"></textarea>
    </div>
  );
};

export default BillingForm;
