import { Routes, Route, Link } from 'react-router-dom';
import '@fontsource/press-start-2p';
import './App.css';

function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#00ffcc] flex flex-col items-center justify-center font-['Press_Start_2P'] p-4 text-center">
      <h1 className="text-2xl sm:text-3xl mb-6 animate-pulse">👾 FatFront Starter</h1>
      <p className="mb-6 text-xs sm:text-sm max-w-md">
        The starter kit powered by <br /> 
        <br />
        <span className=" mt-2 text-[#ff00ff]">React + Vite + Tailwind v4 + React Router </span>
      </p>
      <Link
        to="/about"
        className="glow-button mt-5"
      >
        ➡️ About Page
      </Link>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#00ffcc] flex flex-col items-center justify-center font-['Press_Start_2P'] p-4 text-center">
      <h1 className="text-2xl sm:text-3xl mb-6">📜 About FatFront</h1>
      <p className="mb-6 text-xs sm:text-sm max-w-md">
        A retro-themed React boilerplate made for frontend devs who love ✨ vibes.
      </p>
      <Link
        to="/"
        className="glow-button mt-2"
      >
        ⬅️ Back to Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
