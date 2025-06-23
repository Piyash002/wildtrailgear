import { useEffect, useState } from 'react';

export default function ThemeController() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.body.className = saved;
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.body.className = next;
  };

  return (
    <div>
      <h1>{theme.toUpperCase()} MODE</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
