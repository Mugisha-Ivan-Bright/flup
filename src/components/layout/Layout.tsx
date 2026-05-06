import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export const Layout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {!isMobile && <Sidebar />}
      <main
        style={{
          flex: 1,
          backgroundColor: "#F0EFF4",
          overflowY: "auto",
          padding: isMobile ? "16px" : "32px 28px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
