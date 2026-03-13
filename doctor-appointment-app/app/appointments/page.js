"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  /* ✅ Load appointments per logged-in user */
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
      router.push("/login");
      return;
    }

    const userAppointmentsKey = `appointments_${currentUser}`;

    const stored =
      JSON.parse(localStorage.getItem(userAppointmentsKey)) || [];

    setAppointments(stored);
  }, []);

  /* Filter based on tab */
  const filteredAppointments = appointments.filter(
    (a) => a.status === activeTab
  );

  /* ✅ Payment update per user */
  const handlePayment = (id) => {
    const currentUser = localStorage.getItem("currentUser");
    const userAppointmentsKey = `appointments_${currentUser}`;

    const updated = appointments.map((a) =>
      a.id === id ? { ...a, payment: "Paid" } : a
    );

    setAppointments(updated);
    localStorage.setItem(
      userAppointmentsKey,
      JSON.stringify(updated)
    );
  };

  /* ✅ Cancel update per user */
  const handleCancel = (id) => {
    const currentUser = localStorage.getItem("currentUser");
    const userAppointmentsKey = `appointments_${currentUser}`;

    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: "canceled" } : a
    );

    setAppointments(updated);
    localStorage.setItem(
      userAppointmentsKey,
      JSON.stringify(updated)
    );
  };

  return (
    <div
      className="dashboard-bg"
      style={{ backgroundImage: "url('/images/doctor-bg.jpg')" }}
    >
      {/* NAVBAR */}
      <nav className="dashboard-navbar">
        <div className="nav-left">
          <span
            className="nav-item"
            onClick={() => router.back()}
          >
            ← Back
          </span>
        </div>

        <div className="nav-center">
          <span
            className="nav-item"
            onClick={() => router.push("/dashboard")}
          >
            Find Doctor
          </span>

          <span
  className="nav-item"
  onClick={() => router.push("/appointments")}
>
  My Appointments
</span>   
          <span
  className="nav-item"
  onClick={() => router.push("/profile")}
>
  Profile
</span>

        </div>

        <div className="nav-right">
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("currentUser");
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="dashboard-content">
        <div className="appointments-card-modern">

          <h2>Appointments</h2>

          {/* Tabs */}
          <div className="appointments-tabs-modern">
            {["upcoming", "completed", "canceled"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn-modern ${
                  activeTab === tab ? "active-tab-modern" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="appointments-list-modern">
            {filteredAppointments.length === 0 ? (
              <p className="no-data-modern">
                No appointments found.
              </p>
            ) : (
              filteredAppointments.map((a) => (
                <div key={a.id} className="appointment-item-modern">

                  <div className="appointment-info-modern">
                    <img src={a.image} alt={a.doctorName} />

                    <div>
                      <h4>{a.doctorName}</h4>
                      <p>{a.specialty}</p>
                      <p>
                        {a.date} |{" "}
                        <span className="time-modern">
                          {a.time}
                        </span>
                      </p>
                      <p>Payment | {a.payment}</p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="appointment-actions">

                    {a.payment === "Not paid" &&
                      a.status === "upcoming" && (
                        <button
                          className="pay-btn-modern"
                          onClick={() => handlePayment(a.id)}
                        >
                          Make Payment
                        </button>
                      )}

                    {a.status === "upcoming" && (
                      <button
                        className="cancel-btn-modern"
                        onClick={() => handleCancel(a.id)}
                      >
                        Cancel
                      </button>
                    )}

                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}