import { useState, useEffect } from "react";
import API from "../api/api";
import "./../styles/merchantdashboard.css";

export default function MerchantDashboard({ user }) {
  const [service, setService] = useState({
    title: "",
    description: "",
    category: "other",
    price: "",
    image: "",
  });

  const [services, setServices] = useState([]);
  const [editData, setEditData] = useState(null); // ✅ for Edit Modal

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

  // ➕ ADD SERVICE
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/services/add", service, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Service added successfully!");
      setService({
        title: "",
        description: "",
        category: "other",
        price: "",
        image: "",
      });
      fetchMyServices();
    } catch (error) {
      console.error("Error adding service:", error);
      alert("❌ Failed to add service.");
    }
  };

  // ✏️ OPEN EDIT FORM
  const openEditForm = (srv) => {
    setEditData({ ...srv });
  };


//


const handleUpdateService = async (e) => {
  e.preventDefault();

  console.log("ID:", editData._id);
  console.log("Payload:", editData);

  try {
    const token = localStorage.getItem("token");

    await API.put(`/services/${editData._id}`, editData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("✅ Service updated!");
    setEditData(null);
    fetchMyServices();
  } catch (error) {
    console.error("Update error:", error);
    alert("❌ Failed to update service");
  }
};


  // 🗑 DELETE SERVICE
  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("🗑 Service deleted!");
      fetchMyServices();
    } catch (error) {
      console.error("Delete error:", error);
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
          onChange={(e) =>
            setService({ ...service, description: e.target.value })
          }
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
          onChange={(e) =>
            setService({ ...service, category: e.target.value })
          }
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
          <li key={s._id} className="service-item">
            <strong>{s.title}</strong> - ₹{s.price}
            <p>{s.description}</p>

            <button onClick={() => openEditForm(s)} className="edit-btn">
              ✏️ Edit
            </button>

            <button
              onClick={() => deleteService(s._id)}
              className="delete-btn"
            >
              🗑 Delete
            </button>
          </li>
        ))}
      </ul>

      {/* -------------------- EDIT MODAL -------------------- */}
      {editData && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Service</h3>

            <form onSubmit={handleUpdateService}>
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />

              <input
                type="text"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />

              <input
                type="number"
                value={editData.price}
                onChange={(e) =>
                  setEditData({ ...editData, price: e.target.value })
                }
              />

              <select
                value={editData.category}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
              >
                <option value="home">Home</option>
                <option value="beauty">Beauty</option>
                <option value="pet">Pet</option>
                <option value="automotive">Automotive</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                value={editData.image}
                onChange={(e) =>
                  setEditData({ ...editData, image: e.target.value })
                }
              />

              <button type="submit">Save Changes</button>
              <button
                type="button"
                onClick={() => setEditData(null)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
