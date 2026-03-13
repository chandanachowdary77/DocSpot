"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "@/app/globals.css";

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();

  /* ================= DOCTORS DATA ================= */
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

  const [doctor, setDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    const foundDoctor = doctorsData.find(
      (doc) => doc.id === Number(id)
    );
    setDoctor(foundDoctor);
  }, [id]);

  if (!doctor) return <div>Loading...</div>;

  /* Calendar */
  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from(
    { length: getDaysInMonth(currentMonth, currentYear) },
    (_, i) => i + 1
  );

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const morningSlots = [
    "09:30 AM - 09:45AM",
    "10:00 AM - 10:15AM",
    "10:30 AM - 10:45AM",
    "11:30 AM - 11:45AM",
    "12:00 PM - 12:15PM",
  ];

  const eveningSlots = [
    "01:00 PM - 01:15PM",
    "02:00 PM - 02:15PM",
  ];

  /* ✅ Check if slot already booked */
  const isSlotBooked = (slot) => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    for (let user of users) {
      const key = `appointments_${user.email}`;
      const appointments =
        JSON.parse(localStorage.getItem(key)) || [];

      const match = appointments.find(
        (a) =>
          a.doctorName === doctor.name &&
          a.date === `${selectedDate} ${monthNames[currentMonth]} ${currentYear}` &&
          a.time === slot &&
          a.status !== "canceled"
      );

      if (match) return true;
    }

    return false;
  };

  /* Booking */
  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select date and slot");
      return;
    }

    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
      alert("Please login again");
      router.push("/login");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      doctorName: doctor.name,
      specialty: doctor.specialty,
      image: doctor.image,
      date: `${selectedDate} ${monthNames[currentMonth]} ${currentYear}`,
      time: selectedSlot,
      status: "upcoming",
      payment: "Not paid",
    };

    const key = `appointments_${currentUser}`;
    const existing =
      JSON.parse(localStorage.getItem(key)) || [];

    localStorage.setItem(
      key,
      JSON.stringify([...existing, newAppointment])
    );

    router.push("/appointments");
  };

  return (
    <div
      className="dashboard-bg"
      style={{ backgroundImage: "url('/images/doctor-bg.jpg')" }}
    >
      <nav className="dashboard-navbar">
        <div className="nav-left">
          <span className="nav-item" onClick={() => router.back()}>
            ← Back
          </span>
        </div>

        <div className="nav-center">
          <span className="nav-item" onClick={() => router.push("/dashboard")}>
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

      <div className="dashboard-content">
        <div className="booking-card-modern">

          <div className="doctor-book-card">
            <div>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
              <p>⭐ {doctor.rating} ({doctor.reviews} reviews)</p>
            </div>
            <img src={doctor.image} alt={doctor.name} />
          </div>

          <h4>Select Date</h4>

          <div className="full-date-selector">
            <select
              value={currentMonth}
              onChange={(e) => setCurrentMonth(Number(e.target.value))}
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>

            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
            >
              {Array.from({ length: 5 }, (_, i) => today.getFullYear() + i)
                .map((year) => (
                  <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">Select Date</option>
              {daysArray.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <h4>Select Slot</h4>

          <h4 className="slot-heading">Morning Slots</h4>

<div className="slot-grid">
  {morningSlots.map((slot, i) => {
    const booked = isSlotBooked(slot);

    return (
      <button
        key={i}
        disabled={booked}
        className={`slot-btn 
          ${booked ? "booked-slot" : ""}
          ${selectedSlot === slot ? "active-slot" : ""}
        `}
        onClick={() => !booked && setSelectedSlot(slot)}
      >
        {booked ? "Booked" : slot}
      </button>
    );
  })}
</div>

<h4 className="slot-heading">Evening Slots</h4>

<div className="slot-grid">
  {eveningSlots.map((slot, i) => {
    const booked = isSlotBooked(slot);

    return (
      <button
        key={i}
        disabled={booked}
        className={`slot-btn 
          ${booked ? "booked-slot" : ""}
          ${selectedSlot === slot ? "active-slot" : ""}
        `}
        onClick={() => !booked && setSelectedSlot(slot)}
      >
        {booked ? "Booked" : slot}
      </button>
    );
  })}
</div>

          <button
            className="confirm-book-btn"
            onClick={handleBooking}
          >
            Book Appointment
          </button>

        </div>
      </div>
    </div>
  );
}