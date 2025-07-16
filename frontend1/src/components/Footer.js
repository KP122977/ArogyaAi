import React from "react";

function Footer() {
  return (
    <footer className="bg-sky-50 border-t border-sky-200 text-center py-4 mt-10 shadow-inner">
      <p className="text-sm text-sky-800">
        © {new Date().getFullYear()} ArogyaAI. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
