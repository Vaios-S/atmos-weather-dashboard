import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import ErrorMessage from "../components/ui/ErrorMessage";
import { motion } from "framer-motion";

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
        subtitle="Sign in to continue exploring live weather around the world."
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {error && <ErrorMessage message={error} />}

              <div>
                <label className="mb-2 block text-sm font-medium text-white/65">
                  Email
                </label>

                <input
                  className="h-14 w-full rounded-2xl border border-white/15 bg-white/10 px-5 text-sm text-white shadow-lg shadow-black/10 outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-white/40 focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-blue-600/40"
                  type="email"
                  value={formData.email}
                  autoComplete="email"
                  placeholder="you@example.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/65">
                  Password
                </label>

                <input
                  className="h-14 w-full rounded-2xl border border-white/15 bg-white/10 px-5 text-sm text-white shadow-lg shadow-black/10 outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-white/40 focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-blue-600/40"
                  type="password"
                  value={formData.password}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <button
                className="h-14 w-full rounded-2xl border border-white/15 bg-white/15 text-sm font-medium text-white shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-blue-600/20  active:scale-[0.98] "
                type="submit"
              >
                Sign in
              </button>

              <p className="text-center text-sm text-white/50">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-white/80 transition-colors duration-300 hover:text-blue-600"
                >
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </AuthLayout>
    </>
  );
}
