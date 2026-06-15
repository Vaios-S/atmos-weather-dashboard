import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.confirmPassword.trim() === ""
    ) {
      console.log("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      console.log("Password must be at least 6 characters");
      return;
    }

    if (state.users.some((user) => user.email === formData.email)) {
      console.log("Email already registered");
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      email: formData.email,
      password: formData.password,
      favorites: [],
      recentSearches: [],
    };

    dispatch({
      type: "REGISTER",
      payload: newUser,
    });

    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });

    navigate("/login");

    console.log("User registered");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
