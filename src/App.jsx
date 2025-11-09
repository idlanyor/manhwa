import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import TerbaruPage from './Pages/TerbaruPage'
import TrendingPage from './Pages/TrendingPage'
import PustakaPage from './Pages/PustakaPage'
import DetailComic from './Pages/page-detail'
import ReadComic from './Pages/read-comic'
import StatisticsPage from './Pages/StatisticsPage'
import usePageTracking from './hooks/usePageTracking'

function AppContent() {
  // Track page views
  usePageTracking()

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terbaru" element={<TerbaruPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/pustaka" element={<PustakaPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/detail-comic/:slug" element={<DetailComic />} />
        <Route path="/read-comic/:slug/:chapterSlug" element={<ReadComic />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App