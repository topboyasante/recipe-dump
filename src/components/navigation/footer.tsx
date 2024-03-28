import React from "react";
import Logo from "../ui/logo";

function Footer() {
  return (
    <footer className="w-full">
      <div className="max-w-screen-xl mx-auto h-full p-5 flex justify-between items-center border-t">
        <div>
            <Logo/>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
