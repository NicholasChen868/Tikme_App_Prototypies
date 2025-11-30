import { Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/shared/Navigation'
import PreClassDashboard from './pages/PreClassDashboard'
import InClassTeaching from './pages/InClassTeaching'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/preclass" replace />} />
          <Route path="/preclass" element={<PreClassDashboard />} />
          <Route path="/inclass" element={<InClassTeaching />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
