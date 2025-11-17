// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";

// import Register from "./pages/register";
// import Login from "./pages/login";
// import Dashboard from "./pages/dashboard";
// import CustomerDashboard from "./pages/customerdashboard";

// function App() {
//   // ✅ user must be inside App component
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem("user");
//     return saved ? JSON.parse(saved) : null;
//   });

//   return (
//     <Router>
//       <Routes>
//         {/* Pass setUser so Login can update user state */}
//         <Route path="/" element={<Login setUser={setUser} />} />
//         <Route path="/login" element={<Login setUser={setUser} />} />

//         <Route path="/register" element={<Register />} />

//         {/* Dashboard receives user */}
//         <Route path="/dashboard" element={<Dashboard user={user} />} />

//         {/* Customer Dashboard only accessible for customers */}
//         <Route 
//           path="/customer-dashboard" 
//           element={<CustomerDashboard user={user} />} 
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import { useState } from "react";

// import Register from "./pages/register";
// import Login from "./pages/login";
// import Dashboard from "./pages/dashboard";
// import CustomerDashboard from "./pages/customerdashboard";
// import Navbar from "./components/Navbar";

// function App() {
//   // Load user if logged in
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem("user");
//     return saved ? JSON.parse(saved) : null;
//   });

//   return (
//     <Router>
//       {/* Navbar should always show */}
//       <Navbar user={user} />

//       <div style={{ marginTop: "90px" }}>
//         <Routes>
//           {/* Login */}
//           <Route path="/" element={<Login setUser={setUser} />} />
//           <Route path="/login" element={<Login setUser={setUser} />} />

//           {/* Register */}
//           <Route path="/register" element={<Register />} />

//           {/* Merchant Dashboard */}
//           <Route path="/dashboard" element={<Dashboard user={user} />} />

//           {/* Customer Dashboard */}
//           <Route path="/customer-dashboard" element={<CustomerDashboard user={user} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;







import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CustomerDashboard from "./pages/customerdashboard";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar user={user} setUser={setUser} />

      <div style={{ marginTop: "90px" }}>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Merchant Dashboard */}
          <Route path="/merchant-dashboard" element={<Dashboard user={user} />} />

          {/* Customer Dashboard */}
          <Route path="/customer-dashboard" element={<CustomerDashboard user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
