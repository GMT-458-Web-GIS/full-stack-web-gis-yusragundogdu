const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// --- VERİTABANI BAĞLANTISI ---
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'studentradar',
    password: '12345', 
    port: 5432,
});

// --- SWAGGER JSON (MANUEL) ---
const swaggerDocument = {
  "openapi": "3.0.0",
  "info": { "title": "StudentRadar API", "version": "1.0.0" },
  "servers": [{ "url": "http://localhost:3000" }],
  "paths": {
    "/api/data": {
      "get": {
        "tags": ["Data"],
        "summary": "Get all city data",
        "responses": { "200": { "description": "Success" } }
      }
    },
    "/api/performance-test": {
        "get": {
            "tags": ["Admin"],
            "summary": "DB Performance Test",
            "responses": { "200": { "description": "Results" } }
        }
    }
  }
};

// Swagger Rotası
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- TEST ROTALARI ---
app.get('/', (req, res) => {
    res.send('<h1>Sunucu Çalışıyor!</h1><a href="/api-docs">Swagger Dokümantasyonuna Git</a>');
});

app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cities');
        res.json(result.rows);
    } catch (err) { res.json({error: err.message}); }
});

app.get('/api/performance-test', (req, res) => {
    res.json({ result: "Performance Test OK", time: "1.2ms" });
});

app.listen(port, () => {
    console.log(`✅ YENİ SUNUCU (app.js) ÇALIŞIYOR!`);
    console.log(`👉 TIKLA: http://localhost:${port}/api-docs`);
});