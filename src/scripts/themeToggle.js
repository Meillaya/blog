// src/scripts/themeToggle.js

export function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const asciiArtDark = document.querySelector(".ascii-art-dark");
  const asciiArtLight = document.querySelector(".ascii-art-light");

  function setTheme(theme) {
    document.documentElement.classList.remove("bg-light", "bg-dark");
    document.documentElement.classList.add(`bg-${theme}`);
    localStorage.setItem("theme-preference", theme);
    const event = new CustomEvent("theme-change", { detail: { theme } });
    document.dispatchEvent(event);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme-preference") || "light";
    setTheme(savedTheme === "dark" ? savedTheme : "light");

    themeToggle && themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.classList.contains("bg-light") ? "light" : "dark";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      setTheme(newTheme);
    });
  });
}
