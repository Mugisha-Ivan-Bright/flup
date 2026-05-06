import React from "react";
import { TrendArrow } from "../../components/common/TrendArrow";

interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: number;
}

export const KpiCard: React.FC<KpiCardProps> = ({ icon, label, value, trend }) => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8E8E8",
        borderRadius: 12,
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 18, color: "#9B9B9B" }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 400, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: 0.5 }}>
          {label}
        </span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#0D3D2B" }}>{value}</div>
      <div>
        <TrendArrow percent={trend} />
      </div>
    </div>
  );
};
