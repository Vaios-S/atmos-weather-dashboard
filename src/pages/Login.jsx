import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const foundUser = state.users.find(
    (user) =>
      user.email === formData.email && user.password === formData.password,
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.email.trim() === "" || formData.password.trim() === "") {
      setError("All fields are required");
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
      setError("Invalid email or password");
    }
  }

  return (
    <>
      <AuthLayout
        title="Welcome back"
        subtitle="Sign in to continue to your weather dashboard."
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
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
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
            Login
          </button>
          <p className="text-sm text-white/50">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
          <p>{error}</p>
        </form>
      </AuthLayout>
    </>
  );
}
