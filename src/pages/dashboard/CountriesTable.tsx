import React from "react";

const products = [
  { name: "Time", percent: 19, color: "#8B5CF6" },
  { name: "Morpheus", percent: 15, color: "#3B82F6" },
  { name: "Measure", percent: 13, color: "#14B8A6" },
  { name: "Earth", percent: 12, color: "#F97316" },
  { name: "Aurora", percent: 11, color: "#EF9F27" },
  { name: "Terra", percent: 10, color: "#EC4899" },
  { name: "Nimbus", percent: 9, color: "#9CA3AF" },
  { name: "Atlas", percent: 8, color: "#2ECC8F" },
];

// Present top products ordered by income (descending)
const sortedProducts = [...products].sort((a, b) => b.percent - a.percent);

export const CountriesTable: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8E8E8",
        borderRadius: 12,
        padding: "16px 20px",
        flex: 1,
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 600, color: "#0D3D2B", marginBottom: 16 }}>
        Sales by income
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          {sortedProducts.map((product) => (
            <div
              key={product.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 4px",
                borderBottom: "1px solid #F0EFF4",
                fontSize: 13,
                color: "#1A1A1A",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#E8F7F1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  backgroundColor: product.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1 }}>{product.name}</span>
              <span style={{ fontWeight: 600, color: "#0D3D2B" }}>{product.percent}%</span>
            </div>
          ))}
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#F0EFF4",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: "#9B9B9B",
          }}
        >
          Choropleth map placeholder
        </div>
      </div>
    </div>
  );
};
