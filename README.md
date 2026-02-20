# 🩺 Schedulla - Doctor Appointment Booking App

Schedulla is a responsive Doctor Appointment Booking Web Application built using **Next.js (App Router)** and **React**.  
It allows users to sign up, login, browse doctors, view detailed profiles, and book appointments.

---

## 🚀 Features

### 🔐 Authentication
- Signup with Name, Email & Password
- OTP Verification Page (Frontend Mock)
- Login validation using localStorage
- Logout functionality
- Protected Dashboard route

---

### 🏥 Dashboard
- Display 15+ Doctors
- Search doctors by name
- Filter doctors by specialty
- Dynamic availability status
- Fully responsive layout

---

### 👨‍⚕️ Doctor Details Page
- Doctor profile information
- Qualification
- Experience
- Rating & Reviews
- About section
- Service & Specialization
- Availability schedule
- Book Appointment button
- Responsive design for all screens

---

## 🛠️ Tech Stack

- **Next.js 13+ (App Router)**
- **React**
- **TypeScript**
- **CSS (Custom Styling)**
- **LocalStorage (Mock Authentication)**

---

## 📂 Project Structure


app/
│
├── login/
├── signup/
├── otp/
├── dashboard/
├── doctor/[id]/
│
public/
├── images/
│
app/globals.css


---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/schedulla.git

Navigate into the project:

cd schedulla

Install dependencies:

npm install

Run development server:

npm run dev

Open browser:

http://localhost:3000
🔑 How Authentication Works (Frontend Only)

Signup stores user in localStorage

OTP page simulates verification

Login validates stored user

Token saved in localStorage

Dashboard protected using token check

⚠️ This is frontend-only mock authentication.

📱 Responsiveness

Fully flexible layout

Works on:

Mobile

Tablet

Laptop

Desktop

Uses flexible grid system and media queries
