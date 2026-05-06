import React, { useState } from "react";
import {
  DashboardOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  TeamOutlined,
  TagOutlined,
  DollarOutlined,
  FileTextOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router";
import { ColorModeContext } from "../../contexts/color-mode";
import { useContext } from "react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  section?: string;
}

const navItems: NavItem[] = [
  { section: "MARKETING", label: "Dashboard", path: "/dashboard", icon: <DashboardOutlined /> },
  { label: "Marketplace", path: "/marketplace", icon: <ShopOutlined /> },
  { label: "Orders", path: "/orders", icon: <ShoppingCartOutlined /> },
  { label: "Tracking", path: "/tracking", icon: <CarOutlined /> },
  { label: "Customers", path: "/customers", icon: <TeamOutlined /> },
  { label: "Discounts", path: "/discounts", icon: <TagOutlined /> },
  { section: "PAYMENTS", label: "Ledger", path: "/ledger", icon: <DollarOutlined /> },
  { label: "Taxes", path: "/taxes", icon: <FileTextOutlined /> },
  { section: "SYSTEM", label: "Settings", path: "/settings", icon: <SettingOutlined /> },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, setMode } = useContext(ColorModeContext);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      style={{
        width: collapsed ? 60 : 220,
        height: "100vh",
        backgroundColor: "#FFFFFF",
        borderRight: "1px solid #E8E8E8",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: collapsed ? "20px 0" : "20px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "#2ECC8F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          F
        </div>
        {!collapsed && (
          <span style={{ fontSize: 16, fontWeight: 600, color: "#0D3D2B" }}>Flup</span>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          padding: "0 12px 12px",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "1px solid #E8E8E8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 12,
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>

      <nav style={{ flex: 1, overflowY: "auto", padding: "0 8px" }}>
        {navItems.map((item) => (
          <React.Fragment key={item.path}>
            {item.section && (
              <div
                style={{
                  padding: collapsed ? "16px 0 8px" : "16px 12px 8px",
                  fontSize: 10,
                  fontWeight: 500,
                  color: "#9B9B9B",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {collapsed ? "—" : item.section}
              </div>
            )}
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer",
                backgroundColor: isActive(item.path) ? "#E8F7F1" : "transparent",
                color: isActive(item.path) ? "#0D3D2B" : "#1A1A1A",
                fontWeight: isActive(item.path) ? 500 : 400,
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 2,
              }}
              onClick={() => navigate(item.path)}
            >
              <span style={{ fontSize: 18, color: isActive(item.path) ? "#2ECC8F" : undefined }}>
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
            </div>
          </React.Fragment>
        ))}

        <div
          style={{
            padding: collapsed ? "16px 0 8px" : "16px 12px 8px",
            fontSize: 10,
            fontWeight: 500,
            color: "#9B9B9B",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {collapsed ? "—" : "SYSTEM"}
        </div>
        <div
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 2,
            fontSize: 13,
          }}
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
          <span style={{ fontSize: 18 }}>
            {mode === "light" ? <MoonOutlined /> : <SunOutlined />}
          </span>
          {!collapsed && <span>Dark mode</span>}
        </div>
      </nav>

      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid #E8E8E8",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "#F0EFF4",
            flexShrink: 0,
          }}
        />
        {!collapsed && (
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A" }}>Harper Nelson</div>
            <div style={{ fontSize: 12, color: "#9B9B9B" }}>Admin Manager</div>
          </div>
        )}
        {!collapsed && (
          <LogoutOutlined
            style={{ color: "#9B9B9B", cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("TOKEN_KEY");
              navigate("/login");
            }}
          />
        )}
      </div>
    </div>
  );
};
