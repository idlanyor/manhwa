import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import DetailComic from './Pages/page-detail'
import ReadComic from './Pages/read-comic'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail-comic/:slug" element={<DetailComic />} />
        <Route path="/read-comic" element={<ReadComic />} />
      </Routes>
    </Router>
  )
}

export default App