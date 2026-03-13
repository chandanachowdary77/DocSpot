"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "../../app/globals.css";
import { Stethoscope } from "lucide-react";

const doctorsData = [
  { id: 1, name: "Dr. Prakash Das", specialty: "Psychologist", rating: "4.8", reviews: 120, available: true, image: "/images/doc1.jpg" },
  { id: 2, name: "Dr. Sneha Rao", specialty: "Dermatologist", rating: "4.6", reviews: 98, available: false, image: "/images/doc2.jpg" },
  { id: 3, name: "Dr. Ramesh Kumar", specialty: "Cardiologist", rating: "4.9", reviews: 150, available: true, image: "/images/doc3.jpg" },
  { id: 4, name: "Dr. Anjali Mehta", specialty: "Neurologist", rating: "4.7", reviews: 87, available: true, image: "/images/doc4.jpg" },
  { id: 5, name: "Dr. Vikram Singh", specialty: "Orthopedic", rating: "4.5", reviews: 112, available: false, image: "/images/doc5.jpg" },
  { id: 6, name: "Dr. Kavya Sharma", specialty: "Pediatrician", rating: "4.9", reviews: 200, available: true, image: "/images/doc6.jpg" },
  { id: 7, name: "Dr. Rohit Verma", specialty: "ENT Specialist", rating: "4.4", reviews: 76, available: true, image: "/images/doc7.jpg" },
  { id: 8, name: "Dr. Neha Kulkarni", specialty: "Gynecologist", rating: "4.8", reviews: 132, available: true, image: "/images/doc8.jpg" },
  { id: 9, name: "Dr. Arjun Patel", specialty: "General Physician", rating: "4.3", reviews: 89, available: false, image: "/images/doc9.jpg" },
  { id: 10, name: "Dr. Meera Iyer", specialty: "Ophthalmologist", rating: "4.7", reviews: 140, available: true, image: "/images/doc10.jpg" },
  { id: 11, name: "Dr. Sanjay Malhotra", specialty: "Oncologist", rating: "4.6", reviews: 110, available: false, image: "/images/doc11.jpg" },
  { id: 12, name: "Dr. Pooja Nair", specialty: "Endocrinologist", rating: "4.9", reviews: 175, available: true, image: "/images/doc12.jpg" },
  { id: 13, name: "Dr. Kiran Joshi", specialty: "Urologist", rating: "4.5", reviews: 95, available: true, image: "/images/doc13.jpg" },
  { id: 14, name: "Dr. Tanya Kapoor", specialty: "Psychiatrist", rating: "4.8", reviews: 160, available: true, image: "/images/doc14.jpg" },
  { id: 15, name: "Dr. Aditya Rao", specialty: "Pulmonologist", rating: "4.6", reviews: 102, available: false, image: "/images/doc15.jpg" },
];

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");

    if (!token || !currentUser) {
      router.push("/login");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const loggedUser = users.find((u) => u.email === currentUser);

    if (loggedUser) {
      setUserName(loggedUser.name);
    }
  }, []);

  const specialties = [
    "All",
    ...new Set(doctorsData.map((doc) => doc.specialty)),
  ];

  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesSpecialty =
      selectedSpecialty === "All" ||
      doc.specialty === selectedSpecialty;

    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSpecialty && matchesSearch;
  });

  return (
    <div
      className="dashboard-bg"
      style={{ backgroundImage: "url('/images/doctor-bg.jpg')" }}
    >
      <nav className="dashboard-navbar">
        <div className="nav-left">
  <h2 className="brand">
    Health Care
    <Stethoscope className="brand-icon" size={28} />
  </h2>
</div>
        <div className="nav-center">
          <span
            className={`nav-item ${pathname === "/dashboard" ? "active-nav" : ""}`}
            onClick={() => router.push("/dashboard")}
          >
            Find Doctor
          </span>

          <span
            className={`nav-item ${pathname === "/appointments" ? "active-nav" : ""}`}
            onClick={() => router.push("/appointments")}
          >
            My Appointments
          </span>

          <span
            className={`nav-item ${pathname === "/profile" ? "active-nav" : ""}`}
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

      <div className="dashboard-content">
        <div className="welcome-section">
          <p className="greeting">
            Hello, {userName || "User"}
          </p>
          <h1 className="main-heading">
            Find Your Doctor
          </h1>
        </div>

        <div className="filter-row">
          <input
            type="text"
            placeholder="Search doctors..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="filter-dropdown"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <div className="doctor-grid">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="doctor-card">
              <img src={doc.image} alt={doc.name} />

              <div className="doctor-info">
                <h3>{doc.name}</h3>
                <p className="specialty">{doc.specialty}</p>
                <p className="rating">
                  ⭐ {doc.rating} ({doc.reviews} reviews)
                </p>

                <p className={doc.available ? "available" : "not-available"}>
                  {doc.available ? "Available Today" : "Not Available"}
                </p>

                <button
                  className="book-btn"
                  disabled={!doc.available}
                  onClick={() => router.push(`/doctor/${doc.id}`)}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}