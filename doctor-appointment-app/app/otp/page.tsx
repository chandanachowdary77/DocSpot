"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import "../../app/globals.css";

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length === 6) {
      alert("OTP Verified Successfully");
      router.push("/login");
    } else {
      alert("Enter complete 6-digit OTP");
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
        <img src="/images/side-img.jpg" alt="otp" />
      </div>

      <div className="login-right">
        <h1>
          Verify <span>OTP</span>
        </h1>

        <form onSubmit={handleVerify}>
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
  type="text"
  maxLength={1}
  value={digit}
  ref={(el) => {
    inputsRef.current[index] = el;
  }}
  onChange={(e: ChangeEvent<HTMLInputElement>) =>
    handleChange(e.target.value, index)
  }
/>
            ))}
          </div>

          <button type="submit" className="book-btn">
            VERIFY
          </button>
        </form>
      </div>
    </div>
  );

}
