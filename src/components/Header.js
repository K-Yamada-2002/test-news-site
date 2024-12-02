import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // メニュー外をクリックしたら閉じる処理
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".nav-menu") && !event.target.closest(".hamburger-menu")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <button
        className="hamburger-menu"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="メニューを開く"
      >
        ☰
      </button>
      <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/">ホーム</Link>
        <Link to="/about">サイトについて</Link>
        <Link to="/categories">カテゴリ</Link>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="検索..." />
      </div>
    </header>
  );
};

export default Header;