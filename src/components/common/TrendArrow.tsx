import React from "react";

interface TrendArrowProps {
  percent: number;
}

export const TrendArrow: React.FC<TrendArrowProps> = ({ percent }) => {
  const isPositive = percent >= 0;
  const color = isPositive ? "#2ECC8F" : "#E24B4A";
  const arrow = isPositive ? "▲" : "▼";

  return (
    <span style={{ fontSize: 13, color, display: "inline-flex", alignItems: "center", gap: 4 }}>
      {arrow} {Math.abs(percent)}%
    </span>
  );
};
