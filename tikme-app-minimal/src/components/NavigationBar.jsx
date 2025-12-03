import { useNavigate, useLocation } from 'react-router-dom';

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '48px',
      background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      zIndex: 9999,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <span
        style={{
          color: 'white',
          fontWeight: 700,
          fontSize: '18px',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}
      >
        TikMe
      </span>
      {/* ✅ REMOVED: All navigation buttons (Pre-Class, In-Class, Grammar N5-WA) */}
      {/* Navigation now happens via PreClass button and InClass tools */}
    </nav>
  );
}
