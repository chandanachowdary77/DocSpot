"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

/* ---------------- DOCTORS DATA ---------------- */

const doctorsData = [
  {
    id: 1,
    name: "Dr. Prakash Das",
    specialty: "Psychologist",
    qualification: "MBBS, MD (Psychiatry)",
    experience: "15 years",
    rating: "4.8",
    reviews: 120,
    patients: "5,000+",
    location: "Mumbai",
    available: true,
    consultationFee: 1200,
    image: "/images/doc1.jpg",
    about: "15 years of experience in mental health counseling, anxiety disorders, depression management, and behavioral therapy.",
    service: "Psychological Consultation",
    availabilityDays: "Monday to Saturday",
    availabilityTime: "9 AM To 4 PM",
  },
  {
    id: 2,
    name: "Dr. Sneha Rao",
    specialty: "Dermatologist",
    qualification: "MBBS, MD (Dermatology)",
    experience: "10 years",
    rating: "4.6",
    reviews: 98,
    patients: "3,500+",
    location: "Pune",
    available: false,
    consultationFee: 900,
    image: "/images/doc2.jpg",
    about: "Specialized in acne treatment, skin allergies, cosmetic dermatology, and laser procedures.",
    service: "Skin & Cosmetic Care",
    availabilityDays: "Monday to Friday",
    availabilityTime: "9 AM To 4 PM",
  },
  {
    id: 3,
    name: "Dr. Ramesh Kumar",
    specialty: "Cardiologist",
    qualification: "MBBS, DM (Cardiology)",
    experience: "18 years",
    rating: "4.9",
    reviews: 150,
    patients: "8,000+",
    location: "Chennai",
    available: true,
    consultationFee: 1500,
    image: "/images/doc3.jpg",
    about: "Expert in interventional cardiology, heart surgeries, preventive cardiac care, and hypertension management.",
    service: "Heart Specialist",
    availabilityDays: "Monday to Friday",
    availabilityTime: "9 AM To 4 PM",
  },
  {
    id: 4,
    name: "Dr. Anjali Mehta",
    specialty: "Neurologist",
    qualification: "MBBS, DM (Neurology)",
    experience: "12 years",
    rating: "4.7",
    reviews: 87,
    patients: "4,200+",
    location: "Hyderabad",
    available: true,
    consultationFee: 1300,
    image: "/images/doc4.jpg",
    about: "Treats migraines, epilepsy, stroke recovery, and neurological disorders with advanced care.",
    service: "Neuro Consultation",
    availabilityDays: "Tuesday to Saturday",
    availabilityTime: "9 AM To 4 PM",
  },
  {
    id: 5,
    name: "Dr. Vikram Singh",
    specialty: "Orthopedic",
    qualification: "MBBS, MS (Orthopedics)",
    experience: "14 years",
    rating: "4.5",
    reviews: 112,
    patients: "6,000+",
    location: "Delhi",
    available: false,
    consultationFee: 1000,
    image: "/images/doc5.jpg",
    about: "Specialist in bone fractures, joint replacements, sports injuries, and arthritis treatment.",
    service: "Bone & Joint Care",
    availabilityDays: "Monday to Friday",
    availabilityTime: "9 AM To 4 PM",
  },
  {
    id: 6,
    name: "Dr. Kavya Sharma",
    specialty: "Pediatrician",
    qualification: "MBBS, MD (Pediatrics)",
    experience: "9 years",
    rating: "4.9",
    reviews: 200,
    patients: "7,500+",
    location: "Bangalore",
    available: true,
    consultationFee: 800,
    image: "/images/doc6.jpg",
    about: "Provides complete child healthcare including vaccinations, nutrition, and newborn care.",
    service: "Child Healthcare",
    availabilityDays: "Monday to Saturday",
    availabilityTime: "9 AM To 4 PM",
  },
  {
    id: 7,
    name: "Dr. Rohit Verma",
    specialty: "ENT Specialist",
    qualification: "MBBS, MS (ENT)",
    experience: "11 years",
    rating: "4.4",
    reviews: 76,
    patients: "3,000+",
    location: "Kolkata",
    available: true,
    consultationFee: 850,
    image: "/images/doc7.jpg",
    about: "Treats ear infections, sinus issues, throat disorders, and hearing problems.",
    service: "ENT Consultation",
    availabilityDays: "Monday to Friday",
    availabilityTime: "9 AM To 4 PM",
  },
  {
    id: 8,
    name: "Dr. Neha Kulkarni",
    specialty: "Gynecologist",
    qualification: "MBBS, MS (OBG)",
    experience: "13 years",
    rating: "4.8",
    reviews: 132,
    patients: "5,600+",
    location: "Nagpur",
    available: true,
    consultationFee: 1100,
    image: "/images/doc8.jpg",
    about: "Expert in women's health, pregnancy care, fertility treatments, and hormonal disorders.",
    service: "Women Healthcare",
    availabilityDays: "Monday to Saturday",
    availabilityTime: "9 AM To 4 PM",
  },
  {
    id: 9,
    name: "Dr. Arjun Patel",
    specialty: "General Physician",
    qualification: "MBBS, MD (General Medicine)",
    experience: "8 years",
    rating: "4.3",
    reviews: 89,
    patients: "2,800+",
    location: "Ahmedabad",
    available: false,
    consultationFee: 700,
    image: "/images/doc9.jpg",
    about: "Handles common illnesses, infections, diabetes management, and general health checkups.",
    service: "General Consultation",
    availabilityDays: "Monday to Friday",
    availabilityTime: "9 AM To 4 PM",
  },
  {
    id: 10,
    name: "Dr. Meera Iyer",
    specialty: "Ophthalmologist",
    qualification: "MBBS, MS (Ophthalmology)",
    experience: "16 years",
    rating: "4.7",
    reviews: 140,
    patients: "6,900+",
    location: "Coimbatore",
    available: true,
    consultationFee: 1000,
    image: "/images/doc10.jpg",
    about: "Specialized in cataract surgery, LASIK procedures, and vision correction treatments.",
    service: "Eye Care",
    availabilityDays: "Monday to Friday",
    availabilityTime: "9 AM To 4 PM",
  },
  {
    id: 11,
    name: "Dr. Sanjay Malhotra",
    specialty: "Oncologist",
    qualification: "MBBS, DM (Oncology)",
    experience: "20 years",
    rating: "4.6",
    reviews: 110,
    patients: "9,200+",
    location: "Delhi",
    available: false,
    consultationFee: 1800,
    image: "/images/doc11.jpg",
    about: "Expert in cancer diagnosis, chemotherapy planning, and oncology treatment.",
    service: "Cancer Treatment",
    availabilityDays: "Monday to Thursday",
    availabilityTime: "9 PM To 4 PM",
  },
  {
    id: 12,
    name: "Dr. Pooja Nair",
    specialty: "Endocrinologist",
    qualification: "MBBS, DM (Endocrinology)",
    experience: "17 years",
    rating: "4.9",
    reviews: 175,
    patients: "8,400+",
    location: "Kochi",
    available: true,
    consultationFee: 1400,
    image: "/images/doc12.jpg",
    about: "Specialist in diabetes care, thyroid disorders, hormonal imbalances, and metabolic diseases.",
    service: "Hormone Specialist",
    availabilityDays: "Monday to Saturday",
    availabilityTime: "9 AM To 4 PM",
  },
  {
    id: 13,
    name: "Dr. Kiran Joshi",
    specialty: "Urologist",
    qualification: "MBBS, MCh (Urology)",
    experience: "14 years",
    rating: "4.5",
    reviews: 95,
    patients: "4,700+",
    location: "Surat",
    available: true,
    consultationFee: 1200,
    image: "/images/doc13.jpg",
    about: "Treats kidney stones, urinary infections, and urological surgeries.",
    service: "Urology Consultation",
    availabilityDays: "Monday to Friday",
    availabilityTime: "9 AM To 4 PM",
  },
  {
    id: 14,
    name: "Dr. Tanya Kapoor",
    specialty: "Psychiatrist",
    qualification: "MBBS, MD (Psychiatry)",
    experience: "12 years",
    rating: "4.8",
    reviews: 160,
    patients: "6,200+",
    location: "Jaipur",
    available: true,
    consultationFee: 1100,
    image: "/images/doc14.jpg",
    about: "Treats anxiety, depression, stress disorders, and mood-related conditions.",
    service: "Mental Health Consultation",
    availabilityDays: "Monday to Saturday",
    availabilityTime: "9 AM To 4 PM",
  },
  {
    id: 15,
    name: "Dr. Aditya Rao",
    specialty: "Pulmonologist",
    qualification: "MBBS, DM (Pulmonology)",
    experience: "19 years",
    rating: "4.6",
    reviews: 102,
    patients: "7,800+",
    location: "Visakhapatnam",
    available: false,
    consultationFee: 1500,
    image: "/images/doc15.jpg",
    about: "Expert in respiratory diseases, asthma treatment, and lung health management.",
    service: "Lung Specialist",
    availabilityDays: "Monday to Friday",
    availabilityTime: "9 AM To 4 PM",
  },
];
/* ---------------- COMPONENT ---------------- */

export default function DoctorDetails() {
  const params = useParams();
  const router = useRouter();

  const doctorId = Number(params.id);

  const doctor = doctorsData.find((doc) => doc.id === doctorId);

  /* -------- Auth Check -------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  if (!doctor) return <div>Doctor not found</div>;

  return (
    <div
      className="dashboard-bg"
      style={{ backgroundImage: "url('/images/doctor-bg.jpg')" }}
    >
      {/* ---------------- Navbar ---------------- */}
      <nav className="dashboard-navbar">
        <div className="nav-left">
          <span
            className="nav-item"
            onClick={() => router.push("/dashboard")}
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
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ---------------- Doctor Details ---------------- */}
      <div className="doctor-details-container">
        <div className="doctor-details-card">

          {/* Top Section */}
          <div className="doctor-top">
            <div>
              <h2>{doctor.name}</h2>
              <p className="specialty">{doctor.specialty}</p>
              <p className="qualification">{doctor.qualification}</p>
              <p className="location">{doctor.location}</p>
              <p className="consultation-fee">
                Consultation Fee: ₹ {doctor.consultationFee}
              </p>
            </div>

            <img
              src={doctor.image}
              alt={doctor.name}
              className="doctor-profile-img"
            />
          </div>

          {/* Stats */}
          <div className="doctor-stats-row">
            <div className="stat-box-premium">
              <p className="stat-value">{doctor.patients}</p>
              <p className="stat-label">Patients Treated</p>
            </div>

            <div className="stat-box-premium">
              <p className="stat-value">{doctor.experience}</p>
              <p className="stat-label">Experience</p>
            </div>

            <div className="stat-box-premium">
              <p className="stat-value">{doctor.rating} ⭐</p>
              <p className="stat-label">Average Rating</p>
            </div>

            <div className="stat-box-premium">
              <p className="stat-value">{doctor.reviews}</p>
              <p className="stat-label">Total Reviews</p>
            </div>
          </div>

          {/* About */}
          <div className="doctor-section">
            <h3>About Doctor</h3>
            <p>{doctor.about}</p>
          </div>

          {/* Service */}
          <div className="doctor-section">
            <h3>Service & Specialization</h3>

            <div className="service-row">
              <span>Service</span>
              <span>{doctor.service}</span>
            </div>

            <div className="service-row">
              <span>Specialization</span>
              <span>{doctor.specialty}</span>
            </div>
          </div>

          {/* Availability */}
          <div className="doctor-section">
            <h3>Availability For Consulting</h3>

            <div className="service-row">
              <span>{doctor.availabilityDays}</span>
              <span>{doctor.availabilityTime}</span>
            </div>
          </div>

          {/* Book Button */}
          <button
            className="book-btn large-btn"
            disabled={!doctor.available}
            onClick={() => router.push(`/doctor/${doctor.id}/book`)}
          >
            {doctor.available ? "Book Appointment" : "Not Available"}
          </button>

        </div>
      </div>
    </div>
  );
}