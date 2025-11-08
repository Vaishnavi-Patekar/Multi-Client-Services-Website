import { useState, useEffect } from "react";
import API from "../api/api";
import './../styles/merchantdashboard.css';

export default function MerchantDashboard({ user }) {
  const [service, setService] = useState({
    title: "",
    description: "",
    category: "other",
    price: "",
    image: ""
  });
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchMyServices();
  }, []);

  const fetchMyServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/services/my-services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/services/add", service, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Service added successfully!");
      setService({ title: "", description: "", category: "other", price: "", image: "" });
      fetchMyServices();
    } catch (error) {
      console.error("Error adding service:", error);
      alert("❌ Failed to add service. Check console for details.");
    }
  };

  return (
    <div className="merchant-dashboard">
      <h2>Welcome, {user?.name}</h2>
      <h3>Add New Service</h3>

      <form onSubmit={handleAddService} className="service-form">
        <input
          type="text"
          placeholder="Service Title"
          value={service.title}
          onChange={(e) => setService({ ...service, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={service.description}
          onChange={(e) => setService({ ...service, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={service.price}
          onChange={(e) => setService({ ...service, price: e.target.value })}
          required
        />
        <select
          value={service.category}
          onChange={(e) => setService({ ...service, category: e.target.value })}
        >
          <option value="home">Home</option>
          <option value="beauty">Beauty</option>
          <option value="pet">Pet</option>
          <option value="automotive">Automotive</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={service.image}
          onChange={(e) => setService({ ...service, image: e.target.value })}
        />
        <button type="submit">Add Service</button>
      </form>

      <h3>Your Services</h3>
      <ul className="service-list">
        {services.map((s) => (
          <li key={s._id}>
            <strong>{s.title}</strong> - ₹{s.price}
            <p>{s.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
