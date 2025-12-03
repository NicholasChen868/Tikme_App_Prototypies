import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import PreClassDashboard from './pages/PreClassDashboard';
import InClassTeaching from './pages/InClassTeaching';
import GrammarLibrary from './pages/GrammarLibrary';
import GrammarN5WA from './pages/GrammarN5WA';
import GrammarN4KotoNiSuru from './pages/GrammarN4KotoNiSuru';

export default function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <div style={{ paddingTop: '48px' }}> {/* Offset cho navbar */}
        <Routes>
          <Route path="/" element={<Navigate to="/preclass" replace />} />
          <Route path="/preclass" element={<PreClassDashboard />} />
          <Route path="/inclass" element={<InClassTeaching />} />
          <Route path="/grammar-library" element={<GrammarLibrary />} />
          <Route path="/grammar-n5-wa" element={<GrammarN5WA />} />
          <Route path="/grammar-n4-kotonisuru" element={<GrammarN4KotoNiSuru />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
