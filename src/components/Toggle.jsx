const Toggle = () => {
  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.theme = isDark ? "dark" : "light";
  };

  return (
    <button
      data-testid="theme-toggle"
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 dark:text-white text-black transition">
      Toggle Theme
    </button>
  );
};

export default Toggle;
