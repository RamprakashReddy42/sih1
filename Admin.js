import React, { useState } from "react";

function Admin({ registeredUsers, adminAccount, setAdminAccount }) {
  const [loginForm, setLoginForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Create Admin Account
  const handleCreateAdmin = () => {
    const id = document.getElementById("adminId").value;
    const pass = document.getElementById("adminPass").value;
    const confirmPass = document.getElementById("adminConfirmPass").value;

    if (!id || !pass || !confirmPass) {
      alert("Please fill all fields");
      return;
    }

    if (pass !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    setAdminAccount({ id, pass }); // Save credentials in App.js state
    alert("Admin Account Created! Now login.");
    setLoginForm(true);
  };

  // Admin Login
  const handleLogin = () => {
    const loginId = document.getElementById("loginId").value;
    const loginPass = document.getElementById("loginPass").value;

    if (!loginId || !loginPass) {
      alert("Please fill all fields");
      return;
    }

    if (adminAccount && loginId === adminAccount.id && loginPass === adminAccount.pass) {
      alert("Login Successful!");
      setShowDetails(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="form-container">
      {!loginForm && !showDetails && (
        <>
          <h2>Admin</h2>
          <input type="text" id="adminId" placeholder="User ID" />
          <input type="password" id="adminPass" placeholder="Create Password" />
          <input type="password" id="adminConfirmPass" placeholder="Confirm Password" />
          <button onClick={handleCreateAdmin}>Create Admin</button>
          <button onClick={() => setLoginForm(true)}>Go to Login</button>
        </>
      )}

      {loginForm && !showDetails && (
        <>
          <h2>Admin Login</h2>
          <input type="text" id="loginId" placeholder="User ID" />
          <input type="password" id="loginPass" placeholder="Password" />
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => setLoginForm(false)}>Back to Create Account</button>
        </>
      )}

      {showDetails && (
        <>
          <h2>Registered Users</h2>
          {registeredUsers.length === 0 ? (
            <p>No users registered yet.</p>
          ) : (
            registeredUsers.map((user, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <strong>{user.name}</strong> | {user.mobile} | {user.country} |{" "}
                <a href={user.location} target="_blank" rel="noopener noreferrer">
                  View Location
                </a>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default Admin;
