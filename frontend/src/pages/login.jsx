import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user details
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login successful!");

      // ⭐ ROLE-BASED REDIRECTION ⭐
      if (res.data.user.role === "merchant") {
        navigate("/dashboard");               // merchant dashboard
      } else if (res.data.user.role === "customer") {
        navigate("/customer-dashboard");      // customer dashboard
      } else {
        navigate("/dashboard");               // fallback
      }

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
