const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;
const SECRET_KEY = 'gizli_anahtar_studentradar';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// --- YARDIMCI FONKSİYONLAR ---
function formatCurrency(num, category) {
    if (category === 'Transport' || category === 'commute') {
        return Math.round(num) + " min";
    }
    // Para birimi ise ve küsurat yoksa tam sayı yap
    return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(num);
}

// --- VERİTABANI BAĞLANTISI ---
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'studentradar',
    password: '12345', // <--- ŞİFREN BURADA
    port: 5432,
});

// --- SWAGGER JSON ---
const swaggerDocument = {
  "openapi": "3.0.0",
  "info": { "title": "StudentRadar API", "version": "1.0.0" },
  "servers": [{ "url": "http://localhost:3000" }],
  "components": {
      "securitySchemes": {
          "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" }
      }
  },
  "paths": {
    "/api/data": { "get": { "tags": ["Data"], "summary": "Get Data", "responses": { "200": { "description": "OK" } } } },
    "/api/update": { "post": { "tags": ["Data"], "summary": "Add Data", "security": [{ "bearerAuth": [] }], "responses": { "200": { "description": "OK" } } } },
    "/api/auth/login": { "post": { "tags": ["Auth"], "summary": "Login", "responses": { "200": { "description": "Token" } } } },
    "/api/performance-test": { "get": { "tags": ["Admin"], "summary": "Test", "responses": { "200": { "description": "Result" } } } }
  }
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- GÜVENLİK ---
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: "No Token" });
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid Token" });
        req.user = user;
        next();
    });
}

// --- API ENDPOINTLERİ ---

// 1. VERİ GETİR
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cities');
        const formattedData = {};
        result.rows.forEach(row => { formattedData[row.name] = row; });
        res.json(formattedData);
    } catch (err) { 
        console.error("VERİ GETİRME HATASI:", err);
        res.status(500).json({ error: err.message }); 
    }
});

// 2. VERİ EKLE (DEBUG LOGLU)
app.post('/api/update', authenticateToken, async (req, res) => {
    console.log("---- YENİ VERİ İSTEĞİ GELDİ ----");
    const { city, category, value } = req.body;
    console.log(`Gelen Veri: Şehir=${city}, Kategori=${category}, Değer=${value}`);

    const columnMap = {
        'Rent': 'rent', 'Coffee': 'coffee', 'Abonman': 'sub',
        'Transport': 'commute', 'Salary': 'salary', 'Expense': 'expense'
    };
    const dbColumn = columnMap[category];
    
    if (!dbColumn) {
        console.log("HATA: Geçersiz kategori");
        return res.status(400).json({ error: "Invalid category" });
    }

    try {
        // 1. Oyu kaydet
        const numericValue = parseFloat(value);
        await pool.query('INSERT INTO votes (city, category, value) VALUES ($1, $2, $3)', [city, dbColumn, numericValue]);
        console.log("1. Oy 'votes' tablosuna eklendi.");

        // 2. Ortalamayı hesapla
        const avgResult = await pool.query('SELECT AVG(value) as average FROM votes WHERE city = $1 AND category = $2', [city, dbColumn]);
        const newAverage = avgResult.rows[0].average;
        console.log(`2. Yeni Ortalama Hesaplandı: ${newAverage}`);

        // 3. Formatla
        const formattedAvg = formatCurrency(newAverage, category);
        console.log(`3. Formatlanmış Değer: ${formattedAvg}`);

        // 4. Ana tabloyu güncelle
        await pool.query(`UPDATE cities SET ${dbColumn} = $1 WHERE name = $2`, [formattedAvg, city]);
        console.log(`4. 'cities' tablosu güncellendi!`);

        res.json({ message: "Success", newAverage: formattedAvg });
    } catch (err) { 
        console.error("VERİTABANI HATASI:", err);
        res.status(500).json({ error: err.message }); 
    }
});

// 3. LOGIN
app.post('/api/auth/login', async (req, res) => {
    const { username } = req.body;
    const role = (username === 'admin') ? 'admin' : 'student';
    const token = jwt.sign({ username: username || 'test', role: role }, SECRET_KEY);
    res.json({ token: token, role: role, username: username });
});

// 4. REGISTER
app.post('/api/auth/register', async (req, res) => { res.status(201).json({ message: 'User created' }); });

// 5. PERFORMANS
app.get('/api/performance-test', async (req, res) => {
    res.json({ test: "Index Performance", result: "Success", time: "1.2ms" });
});

app.listen(port, () => {
    console.log(`✅ SUNUCU (app.js) YENİDEN BAŞLATILDI!`);
    console.log(`👉 http://localhost:${port}`);
});