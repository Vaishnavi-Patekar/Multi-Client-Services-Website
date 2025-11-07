// import { useState } from "react";
// import API from "../api/api";

// export default function Register() {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "customer" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/register", formData);
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error occurred");
//     }
//   };

//   return (
//     <div className="register">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" onChange={handleChange} required />
//         <input name="email" placeholder="Email" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//         <select name="role" onChange={handleChange}>
//           <option value="customer">Customer</option>
//           <option value="merchant">Merchant</option>
//         </select>
//         <button type="submit">Register</button>



//       </form>
//       <p>{message}</p>
//     </div>
//   );
// }



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", formData);
      setMessage(res.data.message);

      // ✅ Redirect to login page after 1 second
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
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
        <select name="role" onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="merchant">Merchant</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>

      {/* 👇 Link to Login */}
      <p>
        Already have an account?{" "}
        <Link
          to="/login"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Login here
        </Link>
      </p>
    </div>
  );
}
