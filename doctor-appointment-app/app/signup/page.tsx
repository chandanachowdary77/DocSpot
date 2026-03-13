"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../app/globals.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const randomAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;

  /* ===== Password Validation ===== */
  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(password);
  };

const handleSignup = (e) => {
  e.preventDefault();

  const existingUsers =
    JSON.parse(localStorage.getItem("users")) || [];

  const emailExists = existingUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (emailExists) {
    alert("Email already registered");
    return;
  }

  const newUser = {
    name,
    email,
    password,
    avatar: randomAvatar,
  };

  localStorage.setItem(
    "users",
    JSON.stringify([...existingUsers, newUser])
  );

  alert("Account Created Successfully");
  router.push("/otp");
};
  return (
    <div
      className="login-container"
      style={{
        backgroundImage: "url('/images/back.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="login-left signup-img">
        <img src="/images/side2-img.jpg" alt="signup" />
      </div>

      <div className="login-right">
        <h1>
          Create <span>Account</span>
        </h1>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          {/* Password with Toggle */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              required
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="toggle-btn-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button type="submit" className="book-btn">
            SIGNUP
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span>Or continue with</span>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="google-btn"
          onClick={() => {
            localStorage.setItem("token", "google-mock-token");
            router.push("/dashboard");
          }}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="google-icon"
          />
          Continue with Google
        </button>

        <div className="extra-links">
          <p>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}