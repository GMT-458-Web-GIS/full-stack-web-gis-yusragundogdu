# 🎓 StudentRadar - The Ultimate Student Cost & Life Map 🇹🇷

**StudentRadar** is a comprehensive **Web GIS application** designed to visualize real-life student living costs, transport fees, and academic opportunities on an interactive map.

**Unlike static maps, this project relies on data shared by students**, allowing verified users to contribute real-time price data (Rent, Coffee, Transport) to help prospective students make informed decisions.

---

## 📸 API & Performance Proofs 
The system includes a fully documented Swagger API and Performance Monitoring tools as required.

<table border="0">
  <tr>
    <td width="33%" align="center">
      <img src="swagger-ui.png" width="100%" />
      <br />
      <b>Swagger UI Dashboard</b>
    </td>
    <td width="33%" align="center">
      <img src="perf-test.png" width="100%" />
      <br />
      <b>DB Performance Test (1.2ms)</b>
    </td>
    <td width="33%" align="center">
      <img src="data-result.png" width="100%" />
      <br />
      <b>Data API Response</b>
    </td>
  </tr>
</table>

---

## 🌟 Key Features & Vision

### 1. 🚍 Transport & Subscription Analysis
One of the biggest expenses for students is commuting. StudentRadar specifically tracks:
- **Monthly Subscription (Abonman) Fees:** Comparative costs of student travel cards by city.
- **Commute Costs:** Real-time data on single-ride bus/metro fares for students.

### 2. 🏛️ City & University Guide
The system provides insights for academic planning. When a user explores a city:
- **Top Universities:** Lists high-ranked universities in that specific region.
- **Academic Insight:** Displays brief info relevant to the student demographic.

### 3. ☕ & 🏠 Cost of Living Index
Inspired by the "Ortalama.net" concept but tailored for students:
- **Rent Index:** Average prices for 1+1 apartments and dormitories.
- **Coffee & Food Index:** The "Latte Index" – average cost of a cup of coffee.
- **Dynamic Updates:** Students log in and add data points, keeping the map current.

### 4. 🔐 User Roles & Security
The system implements strict Role-Based Access Control:
- **Guest (Candidate Student):** View-only access to the map and cost averages.
- **Student (Contributor):** Can log in to add new price data points for their location.
- **Admin (Moderator):** Full control to manage users and system performance.

---

## ✅ Assignment Requirements Met

### 1. User Types (20%)
System manages distinct roles as defined above (Guest, Student, Admin). Admin users have exclusive access to performance testing endpoints.

### 2. Authentication (15%)
Users are authenticated via a **JWT (JSON Web Token)** system:
* **Register:** Users create an account via `/api/auth/register`.
* **Login:** Users receive a `Bearer Token` via `/api/auth/login`.
* **Secure Access:** The frontend stores this token and sends it in the header for protected actions (e.g., Adding Data).

### 3. CRUD Operations (15%)
* **Create:** Users contribute data via the modal.
* **Read:** Map displays colored polygons based on cost density.
* **Update:** New data entries automatically update the city's average cost in real-time.

### 4. Performance Monitoring (25%)
We implemented an indexing strategy on the PostgreSQL database to optimize query performance using **B-Tree Indexes**.
* **Without Index:** Query time ~15ms.
* **With Index:** Query time **~1.2ms** (See screenshot above).
* **Result:** >10x speed improvement.

### 5. API Development (Swagger) (25%)
The API is fully documented using Swagger/OpenAPI 3.0 standards.
* **Endpoint:** `http://localhost:3000/api-docs`

---

## 🛠️ Tech Stack

This project is built on a modern **Full-Stack Web GIS** architecture:

* **Frontend:**
  * **HTML5 & CSS3:** Modern "Dark Mode" UI/UX.
  * **OpenLayers:** High-performance mapping library for rendering spatial data (GeoJSON).
* **Backend:**
  * **Node.js & Express.js:** Robust RESTful API handling client requests.
* **Database (Spatial):**
  * **PostgreSQL & PostGIS:** The backbone of the project. Used for storing geospatial points and executing spatial queries.
* **Security & Docs:**
  * **JWT & Bcrypt:** For secure authentication.
  * **Swagger UI:** For automatic API documentation.

---

## 🚀 How to Run
1. Install dependencies: `npm install`
2. Update database config in `app.js` 
3. Start the server: `node app.js`
4. Visit: `http://localhost:3000`
5. Docs: `http://localhost:3000/api-docs`

---

## 🎯 Conclusion

**StudentRadar** represents a significant step forward in visualizing the economic realities of student life in Turkey. By moving beyond static maps and integrating a **community-driven data model**, this project transforms raw geographical data into actionable insights for university candidates and current students.

### Key Takeaways:
- **Social Impact:** Addresses the urgent need for transparent living cost data for students amid economic fluctuations.
- **Technical Integration:** Successfully demonstrates a Full-Stack Web GIS architecture, combining **PostgreSQL/PostGIS** for spatial data management with a reactive **OpenLayers** frontend.
- **Scalability:** The infrastructure is designed to expand beyond rent and coffee prices to include crime rates and social venue density in future iterations.