// src/scripts/themeToggle.js

export function initThemeToggle() {
  // Theme toggle functionality
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-preference', theme);
    
    // Dispatch custom event for theme change
    document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
  }

  function getPreferredTheme() {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme-preference');
    if (savedTheme) return savedTheme;

    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Initialize theme
  setTheme(getPreferredTheme());

  // Setup theme toggle button
  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
        updateThemeIcon();
      });
    }
  });

  // Update theme icon based on current theme
  function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const icon = themeToggle.querySelector('.theme-toggle-icon');
      if (icon) {
        icon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
      }
    }
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme-preference')) {
      setTheme(e.matches ? 'dark' : 'light');
      updateThemeIcon();
    }
  });

  // Initial icon update
  updateThemeIcon();
}