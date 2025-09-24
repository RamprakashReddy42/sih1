const handleSOS = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const mapLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

      const websiteLink = "https://yourappname.netlify.app"; // after deployment
      const message = `🚨 SOS Alert 🚨\nI need help!\nMy location: ${mapLink}\nTrack me here: ${websiteLink}`;

      // Send SMS through backend (Twilio / Fast2SMS / Nexmo)
      fetch("http://localhost:5000/send-sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numbers: [form.nomineeMobile],
          message,
        }),
      });
    });
  }
};
