// import { useState } from "react";
// import API from "../api/api";

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", formData);
//       localStorage.setItem("token", res.data.token);
//       setMessage("Login successful!");
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error occurred");
//     }
//   };

//   return (
//     <div className="login">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="email" placeholder="Email" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Login</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Correct import
import API from "../api/api";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ Add navigation

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");

      // ✅ Redirect to Dashboard
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>

      {/* 👇 Link to Register */}
      <p>
        Not registered yet?{" "}
        <Link
          to="/register"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
