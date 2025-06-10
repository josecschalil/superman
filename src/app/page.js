'use client';

import { useThemeContext } from './context/ThemeContext';
import Hero from './components/Hero';

export default function HomePage() {
  const { isDarkMode } = useThemeContext();

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Hero darkMode={isDarkMode} />
    </div>
  );
}
