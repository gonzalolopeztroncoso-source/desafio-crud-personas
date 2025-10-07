import './index.css'
import NavBar from './components/NavBar.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import PersonasPage from './pages/PersonasPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <div style = {{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personas" element={<PersonasPage />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
  );
