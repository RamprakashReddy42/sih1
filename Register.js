import React, { useState } from "react";
import QRCode from "qrcode.react";

function Register({ onRegister }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    country: "",
    nomineeName: "",
    nomineeMobile: ""
  });

  const [location, setLocation] = useState(null);
  const [qrData, setQrData] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "mobile" || name === "nomineeMobile") && !/^\d{0,10}$/.test(value)) {
      return; // only digits, max 10
    }
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.mobile.length !== 10 || form.nomineeMobile.length !== 10) {
      alert("Mobile numbers must be exactly 10 digits");
      return;
    }

    // Detect GPS
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          setLocation(loc);

          // Save user data including location
          const userData = { ...form, location: loc };
          onRegister(userData);

          // Generate QR
          setQrData(JSON.stringify(userData));
        },
        (err) => {
          alert("Location access denied.");
        }
      );
    } else {
      alert("Geolocation not supported.");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          maxLength="10"
          required
        />
        <select name="country" value={form.country} onChange={handleChange} required>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
        </select>
        <input
          name="nomineeName"
          placeholder="Nominee Name"
          value={form.nomineeName}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="nomineeMobile"
          placeholder="Nominee Mobile"
          value={form.nomineeMobile}
          onChange={handleChange}
          maxLength="10"
          required
        />
        <button type="submit">Register</button>
      </form>

      {location && (
        <div className="location-box">
          <h3>📍 Location</h3>
          <p>Lat: {location.latitude}</p>
          <p>Lng: {location.longitude}</p>
        </div>
      )}

      {qrData && (
        <div className="qr-box">
          <h3>🔗 QR Code</h3>
          <QRCode value={qrData} size={200} />
        </div>
      )}
    </div>
  );
}

export default Register;
