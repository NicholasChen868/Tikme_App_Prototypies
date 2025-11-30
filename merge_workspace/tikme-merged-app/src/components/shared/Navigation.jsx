import { NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <div className="nav-logo">TM</div>
        <div className="nav-title">
          <h1>TikMe</h1>
          <p>Teaching Platform</p>
        </div>
      </div>

      <div className="nav-links">
        <NavLink
          to="/preclass"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">📋</span>
          <span className="nav-text">Pre-Class Dashboard</span>
        </NavLink>

        <NavLink
          to="/inclass"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">🎓</span>
          <span className="nav-text">In-Class Teaching</span>
        </NavLink>
      </div>

      <div className="nav-footer">
        <div className="user-info">
          <div className="user-avatar">T</div>
          <div className="user-details">
            <p className="user-name">Teacher</p>
            <p className="user-role">Instructor</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
