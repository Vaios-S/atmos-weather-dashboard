import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const foundUser = state.users.find(
    (user) =>
      user.email === formData.email && user.password === formData.password,
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.email.trim() === "" || formData.password.trim() === "") {
      console.log("All fields are required");
      return;
    }

    if (foundUser) {
      dispatch({
        type: "LOGIN",
        payload: {
          id: foundUser.id,
          email: foundUser.email,
        },
      });
      navigate("/");
    } else {
      console.log("Invalid email or password");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label>Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
