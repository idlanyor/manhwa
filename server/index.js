import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {
  insertPageView,
  updatePopularPage,
  updateDailyStats,
  getPageViewsByDate,
  getPageViewsByHour,
  getPopularPages,
  getTotalStats,
  getRecentViews,
  getViewsByDevice,
  getViewsByCountry,
  detectDeviceType
} from './db.js';

const app = express();

// Enable CORS
const allowedOrigins = [
  'http://45.127.34.136:5173',
  'https://backend-comic.antidonasi.web.id',
  'https://comic.antidonasi.web.id'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Track page view
app.post('/api/track', async (req, res) => {
  try {
    const { pagePath, pageTitle, referrer } = req.body;
    const userAgent = req.get('user-agent') || '';

    // Detect device type from user agent
    const deviceType = detectDeviceType(userAgent);

    // Get country from Cloudflare header or default to Unknown
    const country = req.get('cf-ipcountry') || 'Unknown';

    // Insert page view with device and country info
    insertPageView.run(pagePath, pageTitle, userAgent, referrer, deviceType, country);

    // Update popular pages
    updatePopularPage.run(pagePath, pageTitle);

    // Update daily stats
    updateDailyStats.run();

    res.json({ success: true, message: 'Page view tracked' });
  } catch (error) {
    console.error('Error tracking page view:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get statistics overview
app.get('/api/stats/overview', (req, res) => {
  try {
    const stats = getTotalStats.get();
    res.json(stats);
  } catch (error) {
    console.error('Error getting overview stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get daily views for last 30 days
app.get('/api/stats/daily', (req, res) => {
  try {
    const dailyViews = getPageViewsByDate.all();
    res.json(dailyViews);
  } catch (error) {
    console.error('Error getting daily stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get hourly views for today
app.get('/api/stats/hourly', (req, res) => {
  try {
    const hourlyViews = getPageViewsByHour.all();
    res.json(hourlyViews);
  } catch (error) {
    console.error('Error getting hourly stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get popular pages
app.get('/api/stats/popular', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const popularPages = getPopularPages.all(limit);
    res.json(popularPages);
  } catch (error) {
    console.error('Error getting popular pages:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get recent views
app.get('/api/stats/recent', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const recentViews = getRecentViews.all(limit);
    res.json(recentViews);
  } catch (error) {
    console.error('Error getting recent views:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get views by device
app.get('/api/stats/device', (req, res) => {
  try {
    const deviceStats = getViewsByDevice.all();
    res.json(deviceStats);
  } catch (error) {
    console.error('Error getting device stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get views by country
app.get('/api/stats/country', (req, res) => {
  try {
    const countryStats = getViewsByCountry.all();
    res.json(countryStats);
  } catch (error) {
    console.error('Error getting country stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const port = process.env.PORT || 8062;
const API_URL = process.env.VITE_API_URL || 'https://backend-comic.antidonasi.web.id';

app.listen(port, () => {
  console.log(`🚀 Statistics API server running on ${API_URL}`);
});
