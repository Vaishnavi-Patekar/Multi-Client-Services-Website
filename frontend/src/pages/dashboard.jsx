// import { useState, useEffect } from "react";
// import API from "../api/Api";
// import { useNavigate } from "react-router-dom";
// import './../styles/dashboard.css';
// import MerchantDashboard from "./merchantdashboard";

// export default function Dashboard({ user }) {
//   if (user?.role === "merchant") return <MerchantDashboard user={user} />;
//   return <div>Welcome {user?.name}</div>;
// }

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           navigate("/login");
//           return;
//         }

//         const res = await API.get("/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/login");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   if (!user) return <p>Loading dashboard...</p>;

//   return (
//     <div className="dashboard">
//       <h2>Welcome, {user.name}!</h2>
//       <h3>Role: {user.role}</h3>

//       {/* 👇 Role-based UI */}
//       {user.role === "customer" ? (
//         <div className="customer-section">
//           <h4>🛍️ Customer Dashboard</h4>
//           <p>You can browse available services and book appointments here.</p>
//         </div>
//       ) : user.role === "merchant" ? (
//         <div className="merchant-section">
//           <h4>💼 Merchant Dashboard</h4>
//           <p>Manage your services, view customer bookings, and analyze sales.</p>
//         </div>
//       ) : (
//         <p>Unknown role.</p>
//       )}

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import MerchantDashboard from "./merchantdashboard";
import "./../styles/dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <p>Loading dashboard...</p>;

  // ✅ Role-based rendering
  if (user.role === "merchant") {
    return (
      <div>
        <MerchantDashboard user={user} />
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    );
  }

  // ✅ For Customers
  if (user.role === "customer") {
    return (
      <div className="dashboard">
        <h2>Welcome, {user.name}!</h2>
        <h3>🛍️ Customer Dashboard</h3>
        <p>You can browse available services and book appointments here.</p>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    );
  }

  // ✅ Default fallback
  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}!</h2>
      <p>Role not recognized.</p>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}
