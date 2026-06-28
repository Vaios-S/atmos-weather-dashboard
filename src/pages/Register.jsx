import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.confirmPassword.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (state.users.some((user) => user.email === formData.email)) {
      setError("Email already registered");
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
      <AuthLayout
        title="Create an account"
        subtitle="Join our weather community and get personalized forecasts."
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            className="
w-full
h-14
rounded-2xl
border
border-white/10
bg-white/5
px-5
text-white
placeholder:text-white/40
backdrop-blur-md
transition-all
duration-200
outline-none
focus:border-blue-500
focus:bg-white/[0.08]
focus:ring-4
focus:ring-blue-500/20
"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <label>Password:</label>
          <input
            className="
w-full
h-14
rounded-2xl
border
border-white/10
bg-white/5
px-5
text-white
placeholder:text-white/40
backdrop-blur-md
transition-all
duration-200
outline-none
focus:border-blue-500
focus:bg-white/[0.08]
focus:ring-4
focus:ring-blue-500/20
"
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <label>Confirm Password:</label>
          <input
            className="
w-full
h-14
rounded-2xl
border
border-white/10
bg-white/5
px-5
text-white
placeholder:text-white/40
backdrop-blur-md
transition-all
duration-200
outline-none
focus:border-blue-500
focus:bg-white/[0.08]
focus:ring-4
focus:ring-blue-500/20
"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <button
            className="
mt-2
w-full
h-14
rounded-2xl
bg-blue-600
font-semibold
text-white
transition-all
duration-300
hover:bg-blue-500
hover:shadow-lg
hover:shadow-blue-500/30
active:scale-[0.98]
"
            type="submit"
          >
            Register
          </button>
          <p className="text-sm text-white/50">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
          <p>{error}</p>
        </form>
      </AuthLayout>
    </>
  );
}
