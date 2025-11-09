import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize database
// Store database in /app/data directory (not /app/server to avoid volume mount conflicts)
const dbPath = process.env.DB_PATH || join(__dirname, '../data/statistics.db');
const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_path TEXT NOT NULL,
    page_title TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    referrer TEXT,
    device_type TEXT,
    country TEXT
  );

  CREATE TABLE IF NOT EXISTS visitor_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL UNIQUE,
    total_visits INTEGER DEFAULT 0,
    unique_pages INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS popular_pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_path TEXT NOT NULL UNIQUE,
    page_title TEXT,
    view_count INTEGER DEFAULT 0,
    last_viewed DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);
  CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(page_path);
  CREATE INDEX IF NOT EXISTS idx_visitor_stats_date ON visitor_stats(date);
  CREATE INDEX IF NOT EXISTS idx_page_views_device ON page_views(device_type);
  CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views(country);
`);

// Helper function to detect device type from user agent
export function detectDeviceType(userAgent) {
  if (!userAgent) return 'Unknown';

  const ua = userAgent.toLowerCase();

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return 'Tablet';
  }
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(userAgent)) {
    return 'Mobile';
  }
  return 'Desktop';
}

// Prepared statements
export const insertPageView = db.prepare(`
  INSERT INTO page_views (page_path, page_title, user_agent, referrer, device_type, country)
  VALUES (?, ?, ?, ?, ?, ?)
`);

export const updatePopularPage = db.prepare(`
  INSERT INTO popular_pages (page_path, page_title, view_count, last_viewed)
  VALUES (?, ?, 1, CURRENT_TIMESTAMP)
  ON CONFLICT(page_path) DO UPDATE SET
    view_count = view_count + 1,
    page_title = excluded.page_title,
    last_viewed = CURRENT_TIMESTAMP
`);

export const updateDailyStats = db.prepare(`
  INSERT INTO visitor_stats (date, total_visits, unique_pages)
  VALUES (DATE('now'), 1, 1)
  ON CONFLICT(date) DO UPDATE SET
    total_visits = total_visits + 1
`);

export const getPageViewsByDate = db.prepare(`
  SELECT
    DATE(timestamp) as date,
    COUNT(*) as views
  FROM page_views
  WHERE timestamp >= DATE('now', '-30 days')
  GROUP BY DATE(timestamp)
  ORDER BY date ASC
`);

export const getPageViewsByHour = db.prepare(`
  SELECT
    strftime('%H:00', timestamp) as hour,
    COUNT(*) as views
  FROM page_views
  WHERE DATE(timestamp) = DATE('now')
  GROUP BY strftime('%H', timestamp)
  ORDER BY hour ASC
`);

export const getPopularPages = db.prepare(`
  SELECT page_path, page_title, view_count
  FROM popular_pages
  ORDER BY view_count DESC
  LIMIT ?
`);

export const getTotalStats = db.prepare(`
  SELECT
    (SELECT COUNT(*) FROM page_views) as total_views,
    (SELECT COUNT(DISTINCT page_path) FROM page_views) as unique_pages,
    (SELECT COUNT(*) FROM page_views WHERE DATE(timestamp) = DATE('now')) as today_views,
    (SELECT COUNT(*) FROM page_views WHERE DATE(timestamp) = DATE('now', '-1 day')) as yesterday_views
`);

export const getRecentViews = db.prepare(`
  SELECT page_path, page_title, timestamp
  FROM page_views
  ORDER BY timestamp DESC
  LIMIT ?
`);

export const getViewsByDevice = db.prepare(`
  SELECT
    COALESCE(device_type, 'Unknown') as device,
    COUNT(*) as views,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM page_views), 2) as percentage
  FROM page_views
  GROUP BY device_type
  ORDER BY views DESC
`);

export const getViewsByCountry = db.prepare(`
  SELECT
    COALESCE(country, 'Unknown') as country,
    COUNT(*) as views,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM page_views), 2) as percentage
  FROM page_views
  GROUP BY country
  ORDER BY views DESC
  LIMIT 10
`);

export default db;
