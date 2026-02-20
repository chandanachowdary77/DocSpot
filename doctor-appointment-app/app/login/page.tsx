"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../app/globals.css";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please signup first");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    if (
      parsedUser.email.toLowerCase() === email.toLowerCase() &&
      parsedUser.password === password
    ) {
      localStorage.setItem("token", "mock-token");
      router.push("/dashboard");
    } else {
      alert("Invalid email or password");
    }
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
      <div className="login-left">
        <img src="/images/side-img.jpg" alt="login" />
      </div>

      <div className="login-right">
        <h1>
          Login To <span>Continue</span>
        </h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className="book-btn">
            LOGIN
          </button>
        </form>

        <div className="extra-links">
          <Link href="/forgot">Forgot Password?</Link>
          <p>
            Don't have an account? <Link href="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}