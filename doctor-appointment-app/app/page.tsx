"use client";

import { useRouter } from "next/navigation";
import "../app/globals.css"; // adjust if needed
import "./landing.css";
<<<<<<< HEAD
import { Stethoscope } from "lucide-react";
=======
>>>>>>> c26d7a8c109e0da026331a219692bdbf92102fd1

export default function Landing() {
  const router = useRouter();

  return (
    <div
      className="landing-container"
    >
      {/* LEFT SIDE */}
      <div className="landing-left">
<<<<<<< HEAD
        <div className="nav-left">
  <h2 className="brand">
    Health Care
    <Stethoscope className="brand-icon" size={28} />
  </h2>
</div>
=======
        <nav className="navbar">
          <div className="logo">HealthCare</div>
        </nav>
>>>>>>> c26d7a8c109e0da026331a219692bdbf92102fd1

        <div className="hero-content">
          <h1>
            Schedule Your <span>Health Visit</span> Today
          </h1>

          <p>
            Fast, secure and easy appointment scheduling system.
          </p>

          <button
            className="hero-btn"
            onClick={() => router.push("/login")}
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="landing-right"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
}