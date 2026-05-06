import React from "react";

const countries = [
  { name: "Poland", percent: 19 },
  { name: "Austria", percent: 15 },
  { name: "Spain", percent: 13 },
  { name: "Romania", percent: 12 },
  { name: "France", percent: 11 },
  { name: "Italy", percent: 11 },
  { name: "Germany", percent: 10 },
  { name: "Ukraine", percent: 9 },
];

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
        Sales by countries
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          {countries.map((country) => (
            <div
              key={country.name}
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
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#2ECC8F",
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1 }}>{country.name}</span>
              <span style={{ fontWeight: 600, color: "#0D3D2B" }}>{country.percent}%</span>
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
