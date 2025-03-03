"use client";
import Link from "next/link";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <nav className="flex justify-between p-4 bg-gray-200 dark:bg-gray-900">
      <Link href="/" className="text-xl font-bold">
        MemeVerse
      </Link>
      <div className="space-x-4">
        <Link href="/explore">Explore</Link>
        <Link href="/upload">Upload</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="ml-4"
        >
          🌙 / ☀️
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
