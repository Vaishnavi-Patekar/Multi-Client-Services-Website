import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/navbar.css";

export default function Navbar({ user, setUser }) {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "customer") loadCartCount();
  }, [user]);

  const loadCartCount = async () => {
    try {
      const res = await API.get("/cart");
      setCartCount(res.data?.items?.length || 0);
    } catch (err) {
      console.error("Cart count error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">ServiceHub</h2>
      </div>

      <div className="nav-right">

        {/* BEFORE LOGIN */}
        {!user && (
          <>
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
          </>
        )}

        {/* CUSTOMER NAVIGATION */}
        {user?.role === "customer" && (
          <>
            <Link to="/customer-dashboard" className="nav-link">
              Dashboard
            </Link>

            <Link to="/cart" className="nav-link cart-link">
              🛒 Cart <span className="cart-count">{cartCount}</span>
            </Link>
          </>
        )}

        {/* MERCHANT NAVIGATION */}
        {user?.role === "merchant" && (
          <>
            <Link to="/merchant-dashboard" className="nav-link">
              Merchant Dashboard
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="username">
              Hello, {user?.name || "User"}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
