import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  // 🟠 Apply theme whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 🟠 Handle toggle change
  const handleThemeChange = e => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center gap-2">
      <input
        id="theme-toggle"
        type="checkbox"
        className="toggle toggle-warning"
        onChange={handleThemeChange}
        checked={theme === 'dark'} // ✅ controlled, not defaultChecked
      />
      {/* <label
        htmlFor="theme-toggle"
        className="text-sm font-medium text-gray-600 dark:text-gray-300"
      >
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </label> */}
    </div>
  );
};

export default ThemeToggle;
