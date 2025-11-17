import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/customer.css";

export default function CustomerDashboard({ user }) {
  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("none");

  useEffect(() => {
    fetchAllServices();
  }, []);

  /* ---------------------------------------------
      FETCH ALL SERVICES
  ----------------------------------------------*/
  const fetchAllServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data);
      setAllServices(res.data);
    } catch (err) {
      console.error("Error loading services:", err);
    }
  };

  /* ---------------------------------------------
      FETCH BY CATEGORY
  ----------------------------------------------*/
  const fetchCategoryServices = async (category) => {
    if (category === "all") {
      setServices(allServices);
      return;
    }

    try {
      const res = await API.get(`/services/category/${category}`);
      setServices(res.data);
    } catch (err) {
      console.error("Category load error:", err);
    }
  };

  /* ---------------------------------------------
      CATEGORY CHANGE
  ----------------------------------------------*/
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchCategoryServices(category);
  };

  /* ---------------------------------------------
      SORTING FUNCTION
  ----------------------------------------------*/
  const handleSort = (type) => {
    setSortType(type);

    let sorted = [...services];

    if (type === "lowtohigh") sorted.sort((a, b) => a.price - b.price);
    if (type === "hightolow") sorted.sort((a, b) => b.price - a.price);

    setServices(sorted);
  };

  /* ---------------------------------------------
      SEARCH FILTER
  ----------------------------------------------*/
  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------------------------------------
      BOOK NOW
  ----------------------------------------------*/
  const handleBooking = async (serviceId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/booking/create",
        { serviceId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("🎉 Booking successful!");
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Booking failed.");
    }
  };

//   const addToCart = async (serviceId) => {
//   try {
//     await API.post("/cart/add", { serviceId });
//     alert("Added to cart!");
//   } catch (err) {
//     console.error("Cart error:", err);
//     alert("Failed to add to cart");
//   }
// };


const addToCart = async (serviceId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add items to cart!");
      return;
    }

    await API.post(
      "/cart/add",
      { serviceId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Added to cart! 🛒");
  } catch (err) {
    console.error("Cart error:", err);
    alert("Failed to add to cart");
  }
};


  return (
    <div className="customer-dashboard">
      <h2 className="dashboard-title">Welcome, {user?.name} 👋</h2>

      {/* SEARCH + FILTER + SORT */}
      <div className="top-controls">
        {/* Search */}
        <input
          type="text"
          placeholder="Search services..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="filter-dropdown"
        >
          <option value="all">All Categories</option>
          <option value="home">Home</option>
          <option value="beauty">Beauty</option>
          <option value="pet">Pet</option>
          <option value="automotive">Automotive</option>
          <option value="other">Other</option>
        </select>

        {/* Sort */}
        <select
          className="sort-dropdown"
          value={sortType}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="none">Sort By</option>
          <option value="lowtohigh">Price: Low → High</option>
          <option value="hightolow">Price: High → Low</option>
        </select>
      </div>

      {/* SERVICES GRID */}
      <div className="services-grid">
        {filteredServices.length === 0 ? (
          <p className="no-results">No services found.</p>
        ) : (
          filteredServices.map((s) => (
            <div className="service-card" key={s._id}>
              <img
                src={s.image || "https://via.placeholder.com/150"}
                alt={s.title}
                className="service-img"
              />

              <div className="service-info">
                <h4>{s.title}</h4>
                <p className="desc">{s.description}</p>

                <p className="price">₹{s.price}</p>
                <p className="category">Category: {s.category}</p>

                {s.merchant && (
                  <p className="merchant-name">
                    Merchant: {s.merchant.name || "Unknown"}
                  </p>
                )}
                


<button className="add-cart-btn" onClick={() => addToCart(s._id)}>
  Add to Cart 🛒
</button>

                <button
                  className="book-btn"
                  onClick={() => handleBooking(s._id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
