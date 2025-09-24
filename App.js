import React, { useState } from "react";
import Admin from "./Admin";
import "./App.css";

function App() {
  const [activeForm, setActiveForm] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [adminAccount, setAdminAccount] = useState(null); // store admin credentials here
  const [showSOSPopup, setShowSOSPopup] = useState(false);

  // Register handler
  const handleRegister = () => {
    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const country = document.getElementById("country").value;
    const nomineeName = document.getElementById("nomineeName").value;
    const nomineeMobile = document.getElementById("nomineeMobile").value;

    if (!/^\d{10}$/.test(mobile)) {
      alert("Mobile number must be 10 digits only.");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const loc = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
        const user = { name, mobile, country, nomineeName, nomineeMobile, location: loc };
        setRegisteredUsers((prev) => [...prev, user]);
        alert("Registered Successfully!");
        setActiveForm(null);
      });
    } else {
      alert("GPS not supported");
    }
  };

  // SOS handlers
  const handleSOS = () => setShowSOSPopup(true);
  const handleAcceptSOS = () => {
    alert("Notification sent to nearby police station!");
    setShowSOSPopup(false);
  };
  const handleDeclineSOS = () => setShowSOSPopup(false);

  return (
    <div className="App">
      <header>
        <button onClick={() => setActiveForm("register")}>Register</button>
        <button onClick={() => setActiveForm("admin")}>Admin</button>
      </header>

      {activeForm === "register" && (
        <div className="form-container">
          <h2>Register</h2>
          <input type="text" id="name" placeholder="Name" />
          <input type="text" id="mobile" placeholder="Mobile Number" maxLength="10" />
          <select id="country">
            <option value="">Select Country</option>
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
            <option>Australia</option>
          </select>
          <input type="text" id="nomineeName" placeholder="Nominee Name" />
          <input type="text" id="nomineeMobile" placeholder="Nominee Mobile Number" maxLength="10" />
          <button onClick={handleRegister}>Submit</button>
        </div>
      )}

      {activeForm === "admin" && (
        <Admin
          registeredUsers={registeredUsers}
          adminAccount={adminAccount}
          setAdminAccount={setAdminAccount} // pass this to Admin.js
        />
      )}

      <button id="sosBtn" onClick={handleSOS}>SOS</button>

      {showSOSPopup && (
        <div className="popup">
          <p>Do you want to send SOS to nearby police station?</p>
          <button id="acceptBtn" onClick={handleAcceptSOS}>Accept</button>
          <button id="declineBtn" onClick={handleDeclineSOS}>Decline</button>
        </div>
      )}
    </div>
  );
}

export default App;
