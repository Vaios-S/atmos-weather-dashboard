import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { motion } from "framer-motion";
import ErrorMessage from "../components/ui/ErrorMessage";

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
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {error && <ErrorMessage message={error} />}
              <label className="mb-2 block text-sm font-medium text-white/65">
                Email
              </label>
              <input
                className="h-14 w-full rounded-2xl border border-white/15 bg-white/10 px-5 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/40 focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-blue-600/40"
                type="email"
                placeholder="Email"
                value={formData.email}
                autoComplete="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <label className="mb-2 block text-sm font-medium text-white/65">
                Password
              </label>
              <input
                className="h-14 w-full rounded-2xl border border-white/15 bg-white/10 px-5 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/40 focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-blue-600/40"
                type="password"
                placeholder="Password"
                value={formData.password}
                autoComplete="new-password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <label className="mb-2 block text-sm font-medium text-white/65">
                Confirm Password
              </label>

              <input
                className="h-14 w-full rounded-2xl border border-white/15 bg-white/10 px-5 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/40 focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-blue-600/40"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                autoComplete="new-password"
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />

              <button
                className="h-14 w-full rounded-2xl border border-white/15 bg-white/15 text-sm font-medium text-white shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-blue-600/20 active:scale-[0.98]"
                type="submit"
              >
                Create account
              </button>

              <p className="text-center text-sm text-white/50">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-white/80 transition-colors duration-300 hover:text-blue-600"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </AuthLayout>
    </>
  );
}
