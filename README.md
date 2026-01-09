# 🎓 StudentRadar - The Ultimate Student Cost & Life Map

**StudentRadar** is a comprehensive **Web GIS application** designed to visualize real-life student living costs, transport fees, and academic opportunities on an interactive map.

Unlike static maps, this project leverages a **crowdsourcing model**, allowing verified students to contribute real-time price data (Rent, Coffee, Transport) to help prospective students make informed decisions.

## 🌟 Key Features & Vision

### 1. 🚍 Transport & Subscription (Abonman) Analysis
One of the biggest expenses for students is commuting. StudentRadar specifically tracks:
- **Monthly Subscription (Abonman) Fees:** Comparative costs of student travel cards by city.
- **Commute Costs:** Real-time data on single-ride bus/metro fares for students.

### 2. 🏛️ City & University Guide (Top 5)
The system provides geospatial insights for academic planning. When a user explores a city:
- **Top 5 Universities:** Lists the highest-ranked universities in that specific region.
- **Academic Insight:** Displays brief rankings and student satisfaction scores.
- **Location Context:** Visualizes the distance between campuses and affordable housing zones.

### 3. ☕ & 🏠 Cost of Living Index (Crowdsourced)
Inspired by the "Ortalama.net" concept but tailored for students:
- **Rent & Dorm Index:** Average prices for 1+1 apartments, KYK dorms, and private dormitories.
- **Coffee & Food Index:** The "Latte Index" – average cost of a cup of coffee or a student menu.
- **Dynamic Updates:** Students log in and add data points, keeping the map current.

### 4. 🔐 User Roles & Security
The system implements a strict Role-Based Access Control (RBAC):
- **Guest (Candidate Student):** View-only access to the map, heatmaps, and cost averages.
- **Student (Contributor):** Can log in to add new price data points for their location.
- **Admin (Moderator):** Full control to manage users and **DELETE** incorrect, outdated, or spam data points.

## 🛠️ Tech Stack

This project is built on a modern **Full-Stack Web GIS** architecture:

- **Frontend:** - **HTML5 & CSS3:** Modern "Dark Mode" UI/UX.
  - **OpenLayers:** High-performance mapping library for rendering spatial data.
- **Backend:** - **Node.js & Express.js:** Robust RESTful API handling client requests.
- **Database (Spatial):** - **PostgreSQL & PostGIS:** The backbone of the project. Used for storing geospatial points and executing spatial queries (e.g., *buffer analysis*, *spatial joins*).
- **Version Control:** Git & GitHub

## 🚀 Installation & Setup Guide

To run this project locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone [https://github.com/GMT-458-Web-GIS/full-stack-web-gis-yusragundogdu.git](https://github.com/GMT-458-Web-GIS/full-stack-web-gis-yusragundogdu.git)
   cd full-stack-web-gis-yusragundogdu