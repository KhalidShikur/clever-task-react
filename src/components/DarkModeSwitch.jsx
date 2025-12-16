import useDarkMode from "../hooks/useDarkMode";

export default function DarkModeSwitch() {
  const [dark, setDark] = useDarkMode();

  return (
    <button
      onClick={() => setDark(!dark)}
      className="
        px-4 py-2 rounded-lg shadow bg-neutral-200 dark:bg-neutral-800 
        text-black dark:text-white transition
      "
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
