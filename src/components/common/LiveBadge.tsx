import React from "react";

export const LiveBadge: React.FC = () => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 12,
        backgroundColor: "#E8F7F1",
        fontSize: 11,
        color: "#0D3D2B",
        fontWeight: 500,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#2ECC8F",
        }}
      />
      Live
    </div>
  );
};
