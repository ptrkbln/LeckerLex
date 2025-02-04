import React from "react";
import Navbar from "../components/Navbar";

function Header() {
  return (
    <header className={`bg-current sticky top-0 z-10`}>
      <Navbar />
    </header>
  );
}

export default Header;
