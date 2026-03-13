"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import "@/app/globals.css";
import { Stethoscope } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [bloodGroup, setBloodGroup] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");

    if (!token || !currentUser) {
      router.push("/login");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users") || "[]");

    const loggedUser = users.find(
      (u: any) => u.email === currentUser
    );

    if (loggedUser) {
      if (!loggedUser.medical) {
        loggedUser.medical = {
          bloodGroup: "",
          allergies: "",
          conditions: "",
        };
      }

      setUser(loggedUser);
      setBloodGroup(loggedUser.medical.bloodGroup);
      setAllergies(loggedUser.medical.allergies);
      setConditions(loggedUser.medical.conditions);
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  const appointmentKey = `appointments_${user.email}`;
  const appointments =
    JSON.parse(localStorage.getItem(appointmentKey) || "[]");

  const handleSaveMedical = () => {
    const users =
      JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((u: any) =>
      u.email === user.email
        ? {
            ...u,
            medical: {
              bloodGroup,
              allergies,
              conditions,
            },
          }
        : u
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setUser({
      ...user,
      medical: {
        bloodGroup,
        allergies,
        conditions,
      },
    });

    setIsEditing(false);
    alert("Medical information updated");
  };

  return (
    <div
      className="dashboard-bg"
      style={{ backgroundImage: "url('/images/doctor-bg.jpg')" }}
    >
      {/* NAVBAR */}
      <nav className="dashboard-navbar">
        <div className="nav-left">
  <h2 className="brand">
    Health Care
    <Stethoscope className="brand-icon" size={28} />
  </h2>
</div>

        <div className="nav-center">
          <span
            className={`nav-item ${
              pathname === "/dashboard" ? "active-nav" : ""
            }`}
            onClick={() => router.push("/dashboard")}
          >
            Find Doctor
          </span>

          <span
            className={`nav-item ${
              pathname === "/appointments" ? "active-nav" : ""
            }`}
            onClick={() => router.push("/appointments")}
          >
            My Appointments
          </span>

          <span
            className={`nav-item ${
              pathname === "/records" ? "active-nav" : ""
            }`}
          >
            Records
          </span>

          <span
            className={`nav-item ${
              pathname === "/profile" ? "active-nav" : ""
            }`}
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
      <div
        className="dashboard-content"
        style={{ paddingTop: "100px" }}   /* FIXED NAVBAR HEIGHT ISSUE */
      >
        <div className="profile-simple-card">

          <h2>My Profile</h2>

          {/* PERSONAL INFO */}
          <div className="profile-section">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p>
              <strong>Total Appointments:</strong>{" "}
              {appointments.length}
            </p>
          </div>

          <hr />

          {/* MEDICAL INFO */}
          <div className="profile-section">
            <div className="section-header">
              <h3>Medical Information</h3>
              <button
                className="edit-btn"
                onClick={() =>
                  setIsEditing(!isEditing)
                }
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {isEditing ? (
              <>
                <input
                  type="text"
                  placeholder="Blood Group"
                  value={bloodGroup}
                  onChange={(e) =>
                    setBloodGroup(e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Allergies"
                  value={allergies}
                  onChange={(e) =>
                    setAllergies(e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Medical Conditions"
                  value={conditions}
                  onChange={(e) =>
                    setConditions(e.target.value)
                  }
                />

                <button
                  className="save-btn"
                  onClick={handleSaveMedical}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p>
                  <strong>Blood Group:</strong>{" "}
                  {user.medical?.bloodGroup ||
                    "Not Added"}
                </p>
                <p>
                  <strong>Allergies:</strong>{" "}
                  {user.medical?.allergies ||
                    "Not Added"}
                </p>
                <p>
                  <strong>Medical Conditions:</strong>{" "}
                  {user.medical?.conditions ||
                    "Not Added"}
                </p>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}