"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import "../../app/globals.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Reset link sent to ${email}`);
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
        <img src="/images/side-img.jpg" alt="forgot" />
      </div>

      <div className="login-right">
        <h1>
          Reset <span>Password</span>
        </h1>

        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter your Email"
            required
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <button type="submit" className="book-btn">
            SEND RESET LINK
          </button>
        </form>

        <div className="extra-links">
          <p>
            Back to <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}