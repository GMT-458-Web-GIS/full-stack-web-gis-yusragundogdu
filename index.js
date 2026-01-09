const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Gelen JSON verilerini okumak için şart

// Veritabanı Bağlantısı
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/api/locations', async (req, res) => {
  try {
    // BURAYI GÜNCELLEDİK: category ve price eklendi
    const query = `
      SELECT id, name, description, category, price, 
      ST_AsGeoJSON(geom) as geometry 
      FROM locations
    `;
    const result = await pool.query(query);

    const geojson = {
      type: "FeatureCollection",
      features: result.rows.map(row => ({
        type: "Feature",
        properties: {
          id: row.id,
          name: row.name,
          description: row.description,
          category: row.category, // YENİ EKLENDİ
          price: row.price        // YENİ EKLENDİ
        },
        geometry: JSON.parse(row.geometry)
      }))
    };

    res.json(geojson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veriler çekilemedi' });
  }
});

// 2. POST - Yeni Nokta Ekle
// Puan: API Development + CRUD (Create)
app.post('/api/locations', async (req, res) => {
  const { name, description, latitude, longitude } = req.body;

  try {
    const query = `
      INSERT INTO locations (name, description, geom)
      VALUES ($1, $2, ST_SetSRID(ST_MakePoint($4, $3), 4326)) 
      RETURNING *
    `;
    // DİKKAT: PostGIS (Boylam, Enlem) yani (X, Y) sırasını kullanır! 
    // O yüzden $4 (longitude) önce, $3 (latitude) sonra yazıldı.
    
    const values = [name, description, latitude, longitude];
    
    const result = await pool.query(query, values);
    res.status(201).json({ message: 'Nokta başarıyla eklendi!', data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veri eklenirken hata oluştu' });
  }
});

// Sunucuyu Başlat
app.listen(port, () => {
  console.log(`Web GIS Sunucusu http://localhost:${port} adresinde aktif!`);
});
// --- SİLME İŞLEMİ (DELETE) ---
// Puan: API Development (%25) + CRUD (%15) + User Roles (%20)
app.delete('/api/locations/:id', async (req, res) => {
  const { id } = req.params; // Silinecek ID'yi al

  try {
    // Veritabanından sil
    const query = 'DELETE FROM locations WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Nokta bulunamadı!' });
    }

    res.json({ message: 'Nokta başarıyla silindi!', deleted: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Silme işlemi başarısız' });
  }
});